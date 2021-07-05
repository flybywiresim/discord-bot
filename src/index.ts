import dotenv from 'dotenv';
import express from 'express';
import discord from 'discord.js';
import commands from './commands';
import eventHandlers from './handlers';
import { makeEmbed } from './lib/embed';
import Logger from './lib/logger';

dotenv.config();

export const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

const app = express();
const client = new discord.Client();

let healthy = false;

client.on('ready', () => {
    Logger.info(`Logged in as ${client.user.tag}!`);
    healthy = true;
});

client.on('disconnect', () => {
    Logger.warn('Client disconnected');
    healthy = false;
});

client.on('message', (msg) => {
    const isDm = msg.channel.type === 'dm';
    const guildId = !isDm ? msg.guild.id : 'DM';

    Logger.debug(`Processing message ${msg.id} from user ${msg.author.id} in channel ${msg.channel.id} of server ${guildId}.`);

    if (msg.author.bot === true) {
        Logger.debug('Bailing because message author is a bot.');
        return;
    }

    if (msg.content.startsWith('.')) {
        Logger.debug('Message starts with dot.');

        const usedCommand = msg.content.substring(1, msg.content.includes(' ') ? msg.content.indexOf(' ') : msg.content.length);
        Logger.info(`Running command '${usedCommand}'`);

        const command = commands[usedCommand];

        if (command) {
            const { executor, name, requiredPermissions } = command;

            const commandsArray = Array.isArray(name) ? name : [name];

            if (!requiredPermissions || requiredPermissions.every((permission) => msg.guild.member(msg.author).hasPermission(permission))) {
                if (commandsArray.includes(usedCommand)) {
                    try {
                        executor(msg, client);
                    } catch ({ name, message, stack }) {
                        msg.channel.send(makeEmbed({
                            color: 'RED',
                            title: 'Error while Executing Command',
                            description: DEBUG_MODE ? `\`\`\`\n${stack}\`\`\`` : `\`\`\`\n${name}: ${message}\n\`\`\``,
                        }));
                    }

                    Logger.debug('Command executor done.');
                }
            } else {
                msg.reply(`you do not have sufficient permissions to use this command. (missing: ${requiredPermissions.join(', ')})`);
            }
        } else {
            Logger.info('Command doesn\'t exist');
        }
    }
});

for (const handler of eventHandlers) {
    client.on(handler.event, handler.executor);
}

client.login(process.env.BOT_SECRET)
    .then()
    .catch((e) => {
        Logger.error(e);
        process.exit(1);
    });

app.get('/healthz', (req, res) => (healthy ? res.status(200).send('Ready') : res.status(500).send('Not Ready')));
app.listen(3000, () => {
    Logger.info('Server is running at http://localhost:3000');
});

process.on('SIGTERM', () => {
    Logger.info('SIGTERM signal received.');
    client.destroy();
    app.close(() => {
        Logger.info('Server stopped.');
    });
});
