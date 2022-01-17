import { GuildMember, Message, PermissionString } from 'discord.js';
import { EventHandlerDefinition } from '../lib/handler';
import Logger from '../lib/logger';
import commands from '../commands';
import { makeEmbed } from '../lib/embed';
import { apm, client, DEBUG_MODE } from '../index';
import { CommandRoleModel } from '../lib/command';

export const message: EventHandlerDefinition<[Message]> = {
    event: 'message',
    executor: async (msg) => {
        const isDm = msg.channel.type === 'dm';
        const guildId = !isDm ? msg.guild.id : 'DM';

        Logger.debug(`Processing message ${msg.id} from user ${msg.author.id} in channel ${msg.channel.id} of server ${guildId}.`);

        if (msg.author.bot === true) {
            Logger.debug('Bailing because message author is a bot.');
            return;
        }

        if (msg.content.startsWith('.')) {
            const transaction = apm.startTransaction('command');
            Logger.debug('Message starts with dot.');

            const usedCommand = msg.content.substring(1, msg.content.includes(' ') ? msg.content.indexOf(' ') : msg.content.length).toLowerCase();
            Logger.info(`Running command '${usedCommand}'`);

            const command = commands[usedCommand];

            if (command) {
                const { executor, name, requiredPermissions, requiredRoles } = command;

                const commandsArray = Array.isArray(name) ? name : [name];

                const authorized = processCommandAuthorization(msg.guild.member(msg.author), requiredPermissions, requiredRoles);

                if (authorized) {
                    if (commandsArray.includes(usedCommand)) {
                        try {
                            await executor(msg, client);
                            transaction.result = 'success';
                        } catch ({ name, message, stack }) {
                            Logger.error({ name, message, stack });
                            await msg.channel.send(makeEmbed({
                                color: 'RED',
                                title: 'Error while Executing Command',
                                description: DEBUG_MODE ? `\`\`\`\n${stack}\`\`\`` : `\`\`\`\n${name}: ${message}\n\`\`\``,
                            }));
                            transaction.result = 'error';
                        }

                        Logger.debug('Command executor done.');
                    }
                } else {
                    await msg.reply(`you do not have sufficient permissions to use this command. (missing: ${requiredPermissions.join(', ')})`);
                }
            } else {
                Logger.info('Command doesn\'t exist');
                transaction.result = 'error';
            }
            transaction.end();
        }
    },
};

function processCommandAuthorization(guildMember: GuildMember, requiredPermissions: PermissionString[] | undefined, requiredRolesModel: CommandRoleModel | undefined): boolean {
    const guildId = guildMember.guild.id;
    const guildRequiredRoles = requiredRolesModel?.[guildId];

    // Verify roles

    let rolesAuthorized;
    if (guildRequiredRoles) {
        rolesAuthorized = guildMember.roles.cache.some(({ id }) => guildRequiredRoles.includes(id));
    } else {
        rolesAuthorized = true;
    }

    // Verify permissions

    let permissionsAuthorized;
    if (requiredPermissions) {
        permissionsAuthorized = requiredPermissions.every((it) => guildMember.hasPermission(it));
    } else {
        permissionsAuthorized = false;
    }

    return rolesAuthorized && permissionsAuthorized;
}
