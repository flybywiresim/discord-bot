import apm from 'elastic-apm-node';
import { ChannelType, Colors, GuildMember } from 'discord.js';
import Logger from '../lib/logger';
import commands from '../commands';
import { makeEmbed } from '../lib/embed';
import { client, DEBUG_MODE } from '../index';
import { CommandRequirements } from '../lib/command';

function satisfiesRequirements(requirements: CommandRequirements, member: GuildMember, channel: string): [boolean, string] {
    if (requirements) {
        let error: [boolean, string];

        if (requirements.permissions) {
            const hasPermissions = requirements.permissions.every((permission) => member.permissions.has(permission));
            
            if (!hasPermissions) {
                if (requirements.permissionsError) {
                    error = [false, requirements.permissionsError];
                } else if (requirements.verboseErrors) {
                    const permissionsError = `The ${requirements.permissions.join(', ')} permission${requirements.permissions.length > 1 ? 's are' : ' is'} required to use that!`;
                    error = [false, permissionsError];
                } else {
                    error = [false, 'You don\'t have the permissions to run that!'];
                }
            }
        }

        if (error) {
            return error;
        }

        if (requirements.roles) {
            const hasAllRoles = requirements.roles.every((role) => member.roles.cache.has(role));
            const hasAnyRole = requirements.roles.some((role) => member.roles.cache.has(role));
            if (requirements.roles && ((!requirements.rolesBlacklist && !hasAllRoles) || (requirements.rolesBlacklist && hasAnyRole))) {
                if (requirements.rolesError) {
                    error = [false, requirements.rolesError];
                } else if (requirements.verboseErrors) {
                    let rolesError: string;

                    if (!requirements.rolesBlacklist) {
                        rolesError = `The ${requirements.roles.map((r) => member.guild.roles.cache.get(r).name).join(', ')} role${requirements.roles.length > 1 ? 's are' : ' is'} required to use that!`;
                    } else {
                        rolesError = `The ${requirements.roles.map((r) => member.guild.roles.cache.get(r).name).join(', ')} role${requirements.roles.length > 1 ? 's are' : ' is'} not allowed to use that!`;
                    }

                    error = [false, rolesError];
                } else {
                    error = [false, 'You don\'t have the required roles to run that!'];
                }
            }
        }

        if (error) {
            return error;
        }

        if (requirements.channels) {
            const isChannel = requirements.channels.map((c) => c.toString()).some((c) => c === channel);
            if (requirements.channels && ((!requirements.channelsBlacklist && !isChannel) || (requirements.channelsBlacklist && isChannel))) {
                if (requirements.channelsError) {
                    error = [false, requirements.channelsError];
                } else if (requirements.verboseErrors) {
                    let channelsError: string;

                    if (!requirements.channelsBlacklist) {
                        channelsError = `That can only be used in ${requirements.channels.map((c) => member.guild.channels.cache.get(c).toString()).join(', ')}!`;
                    } else {
                        channelsError = `That can't be used in ${requirements.channels.map((c) => member.guild.channels.cache.get(c).toString()).join(', ')}!`;
                    }

                    error = [false, channelsError];
                } else {
                    error = [false, 'That can\'t be used here!'];
                }
            }
        }

        if (error) {
            return error;
        }
    }

    Logger.debug('User satisfies all requirements');

    return [true, ''];
}

module.exports = {
    event: 'messageCreate',
    executor: async (msg) => {
        const isDm = msg.channel.isDMBased();
        const guildId = !isDm ? msg.guild.id : ChannelType.DM;

        Logger.debug(`Processing message ${msg.id} from user ${msg.author.id} in channel ${msg.channel.id} of server ${guildId}.`);

        if (msg.author.bot === true) {
            Logger.debug('Bailing because message author is a bot.');
            return;
        }

        if (isDm) {
            Logger.debug('Bailing because message is a DM.');
            return;
        }

        if (msg.content.startsWith('.')) {
            const transaction = apm.startTransaction('command');
            Logger.debug('Message starts with dot.');

            const usedCommand = msg.content.substring(1, msg.content.includes(' ') ? msg.content.indexOf(' ') : msg.content.length).toLowerCase();

            const command = commands[usedCommand];

            if (command) {
                const { executor, name, requirements } = command;

                const commandsArray = Array.isArray(name) ? name : [name];

                const member = await msg.guild.members.fetch(msg.author);

                /*
                Order of command permissions:
                Permission, Role, Channel

                All permissions are AND'ed
                */
                const [satisfied, error] = satisfiesRequirements(requirements, member, msg.channel.id);

                Logger.debug("Requirements checked");

                if (satisfied) {
                    if (commandsArray.includes(usedCommand)) {
                        try {
                            Logger.debug(`Running command '${usedCommand}'`);
                            await executor(msg, client);
                            transaction.result = 'success';
                        } catch ({ name, message, stack }) {
                            Logger.error({ name, message, stack });
                            const errorEmbed = makeEmbed({
                                color: Colors.Red,
                                title: 'Error while Executing Command',
                                description: DEBUG_MODE ? `\`\`\`D\n${stack}\`\`\`` : `\`\`\`\n${name}: ${message}\n\`\`\``,
                            });

                            await msg.channel.send({ embeds: [errorEmbed] });

                            transaction.result = 'error';
                        }

                        Logger.debug('Command executor done.');
                    }
                } else {
                    Logger.debug('Bailing due to unsatisfied requirements');
                    const permEmbed = makeEmbed({
                        color: Colors.Red,
                        title: 'Command Requirements',
                        description: error
                    });
                    let permMsg = await msg.reply({ embeds: [permEmbed] });
                    setTimeout(() => permMsg.delete(), 10000); // Delete after 10 seconds
                }
            } else {
                Logger.debug('Command doesn\'t exist');
                transaction.result = 'error';
            }

            transaction.end();
        }
    },
};
