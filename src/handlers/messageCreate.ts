import apm from 'elastic-apm-node';
import { ChannelType, Colors } from 'discord.js';
import Logger from '../lib/logger';
import commands from '../commands';
import { makeEmbed } from '../lib/embed';
import { client, DEBUG_MODE } from '../index';
import { CommandDefinition, isExecutorCommand, isMessageCommand, hasRequiredPermissions, sendPermissionsEmbed } from '../lib/command';
import { typeCommand } from '../lib/typeCommand';

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
            Logger.info(`Running command '${usedCommand}'`);

            const command = commands[usedCommand];

            if (command) {
                const { name, requirements } = command;
                const commandsArray = Array.isArray(name) ? name : [name];
                const member = await msg.guild.members.fetch(msg.author);

                Logger.debug('Checking requirements');
                const [requirementsSatisfied, requirementsError] = hasRequiredPermissions(requirements, member, msg.channel.id);

                if (requirementsSatisfied) {
                    Logger.debug('Requirements satisfied');
                    if (commandsArray.includes(usedCommand)) {
                        let executor;
                        if (isExecutorCommand(command)) {
                            ({ executor } = (command as CommandDefinition));
                        } else if (isMessageCommand(command)) {
                            executor = typeCommand.executor;
                        }
                        if (executor) {
                            try {
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
                    }
                } else {
                    Logger.debug('Bailing due to unsatisfied command requirements');
                    await sendPermissionsEmbed(msg, requirementsError);
                }
            } else {
                Logger.info('Command doesn\'t exist');
                transaction.result = 'error';
            }
            transaction.end();
        }
    },
};
