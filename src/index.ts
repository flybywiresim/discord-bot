import dotenv from 'dotenv';
import { Client, Partials } from 'discord.js';
import express from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import Logger from './lib/logger';
import { connect } from './lib/db';
import { setupScheduler } from './lib/scheduler';

dotenv.config();
require('elastic-apm-node').start({
    serviceName: 'discord-bot',
    disableSend: true,
});

export const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

export const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildPresences',
        'GuildMessages',
        'GuildMessageReactions',
        'GuildEmojisAndStickers',
        'GuildBans',
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
        setupScheduler('fbwBotScheduler', process.env.MONGODB_URL)
            .catch(Logger.error);
    }
});

client.on('disconnect', () => {
    Logger.warn('Client disconnected');
    healthy = false;
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
}).on('error', (err) => {
    Logger.error(err);
});

process.on('SIGTERM', () => {
    Logger.info('SIGTERM signal received.');
    client.destroy();
    app.close(() => {
        Logger.info('Server stopped.');
    });
});
