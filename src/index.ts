import dotenv from 'dotenv';
import { ChannelType, Client, Colors, Partials } from 'discord.js';
import express from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import commands from './commands';
import { makeEmbed } from './lib/embed';
import Logger from './lib/logger';
import { connect } from './lib/db';

dotenv.config();
const apm = require('elastic-apm-node').start({
    serviceName: 'discord-bot',
    disableSend: true,
});

export const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildPresences',
        'GuildMessages',
        'GuildMessageReactions',
        'GuildEmojisAndStickers',
        'DirectMessages',
        'DirectMessageReactions',
        'DirectMessageTyping',
        'MessageContent',
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ],
});

let healthy = false;

client.on('ready', () => {
    Logger.info(`Logged in as ${client.user.tag}!`);
    healthy = true;

    // Connect to database
    if (process.env.MONGODB_URL) {
        connect(process.env.MONGODB_URL)
            .catch(Logger.error);
    }
});

client.on('disconnect', () => {
    Logger.warn('Client disconnected');
    healthy = false;
});

client.on('messageCreate', async (msg) => {
    const isDm = msg.channel.type === ChannelType.DM;
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
                await msg.reply(`you do not have sufficient permissions to use this command. (missing: ${requiredPermissions.join(', ')})`);
            }
        } else {
            Logger.info('Command doesn\'t exist');
            transaction.result = 'error';
        }
        transaction.end();
    }
});

try {
    const eventHandlers = readdirSync(join(__dirname, 'handlers'));

    eventHandlers.map((file) => {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const handler = require(`./handlers/${file}`);

        if (handler.once) {
            client.once(handler.event, (...args) => handler.executor(...args));
        }
        return client.on(handler.event, (...args) => handler.executor(...args));
    });
} catch (err) {
    Logger.error(err);
    process.exit(1);
}

client.login(process.env.BOT_SECRET)
    .then()
    .catch((e) => {
        Logger.error(e);
        process.exit(1);
    });

//express/k8s code. Auto restarts?

const app = express();

app.get('/healthz', (req, res) => (healthy ? res.status(200)
    .send('Ready') : res.status(500)
    .send('Not Ready')));
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
