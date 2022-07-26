import { startTransaction } from 'elastic-apm-node';
import Logger from '../lib/logger';
import commands from '../commands';
import { makeEmbed } from '../lib/embed';
import { client, DEBUG_MODE } from '../index';

module.exports = {
    event: 'messageCreate',
    executor: async (msg) => {
        // TODO: Update to v14 handling
        const isDm = msg.channel.type === 'DM';
        const guildId = !isDm ? msg.guild.id : 'DM';

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
            const transaction = startTransaction('command');
            Logger.debug('Message starts with dot.');

            const usedCommand = msg.content.substring(1, msg.content.includes(' ') ? msg.content.indexOf(' ') : msg.content.length).toLowerCase();
            Logger.info(`Running command '${usedCommand}'`);

            const command = commands[usedCommand];

            if (command) {
                const { executor, name, requiredPermissions } = command;

                const commandsArray = Array.isArray(name) ? name : [name];

                const member = await msg.guild.members.fetch(msg.author);

                if (!requiredPermissions || requiredPermissions.every((permission) => member.permissions.has(permission))) {
                    if (commandsArray.includes(usedCommand)) {
                        try {
                            await executor(msg, client);
                            transaction.result = 'success';
                        } catch ({ name, message, stack }) {
                            Logger.error({ name, message, stack });
                            const errorEmbed = makeEmbed({
                                color: 'RED',
                                title: 'Error while Executing Command',
                                description: DEBUG_MODE ? `\`\`\`D\n${stack}\`\`\`` : `\`\`\`\n${name}: ${message}\n\`\`\``,
                            });

                            await msg.channel.send({ embeds: [errorEmbed] });

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
