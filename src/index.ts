import { start } from 'elastic-apm-node';
import dotenv from 'dotenv';
import express from 'express';
import discord, { DMChannel, TextChannel } from 'discord.js';
import commands from './commands';
import eventHandlers from './handlers';
import { makeEmbed } from './lib/embed';
import Logger from './lib/logger';

dotenv.config();
const apm = start({
    serviceName: 'discord-bot',
    disableSend: true,
});

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

client.on('message',async (msg) => {
    const scamLogs = client.channels.cache.find(channel => channel.id === '932687046315737149');

    if (msg.content.toLowerCase().includes('@everyone') && msg.author.bot === false && !(msg.channel instanceof DMChannel)) {
        const excludedRoles = [
            'Admin Team',
            'Moderation Team',
            'Development Team',
            'Media Team',
            'Community Support',
            'FBW Emeritus',
        ];
        let hasRole = false;
        excludedRoles.forEach((findrole) => {
            if (msg.member.roles.cache.some((role) => role.name === findrole)) {
                hasRole = true
            }
        });
        // @ts-ignore
        if (hasRole === true) {
            await (scamLogs as TextChannel).send(makeEmbed({
                title: 'Potential Scam Alert',
                thumbnail: { url: 'https://cdn.discordapp.com/attachments/932350968522240101/932625886275043338/Approved.png' },
                description: 'An allowed role has used @everyone',
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    {
                        name: 'User:',
                        value: `<@${msg.author.id}>`,
                    },
                    {   name: 'Channel:',
                        value: `<#${msg.channel.id}>`,
                    },
                    {
                        name: 'Message Content:',
                        value: msg.content.toString(),
                    }
                ],
            }));
        } else {
            const mutedRole = msg.guild.roles.cache.find((role) => role.name === 'Muted');

            await msg.delete();
            try {
                await msg.author.send('We have detected use of @everyone in one of our text channels. This function is in place to prevent discord scams and has resulted in an automatic mute and notification of our moderation team. If this was done in error, our moderation team will reverse the mute, however please refrain from using the @everyone ping in future.');
            } catch (e) {
                Logger.error(e);
                await (client.channels.cache.find((channel) => channel.id === '932687046315737149') as TextChannel).send(makeEmbed({
                    author: {
                        name: msg.author.tag,
                        icon_url: msg.author.displayAvatarURL({ dynamic: true }),
                    },
                    description: ' DM was not sent to ' + `<@${  msg.author.id  }>` + '.',
                }));
            }
            await (client.channels.cache.find((channel) => channel.id === '932687046315737149') as TextChannel).send(makeEmbed({
                title: 'Potential Scam Alert',
                thumbnail: { url: 'https://cdn.discordapp.com/attachments/932350968522240101/932625893657026630/Scam.png' },
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    {
                        name: 'User:',
                        value: `<@${  msg.author.id  }>`,
                    },
                    {   name: 'Channel:',
                        value: `<#${msg.channel.id}>`,
                    },
                    {
                        name: 'Message Content:',
                        value: msg.content.toString(),
                    }
                ],
            }));
            await msg.member.roles.add(mutedRole);
        }
    }
});

client.on('message', async (msg) => {
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
            const { executor, name, requiredPermissions } = command;

            const commandsArray = Array.isArray(name) ? name : [name];

            if (!requiredPermissions || requiredPermissions.every((permission) => msg.guild.member(msg.author).hasPermission(permission))) {
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
