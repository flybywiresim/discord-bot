import { codeBlock, Colors, DMChannel, TextChannel } from 'discord.js';
import { makeEmbed, makeLines } from '../lib/embed';
import Logger from '../lib/logger';
import { Roles, Channels } from '../constants';

const excludedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
    Roles.DEVELOPMENT_TEAM,
    Roles.MEDIA_TEAM,
    Roles.COMMUNITY_SUPPORT,
    Roles.FBW_EMERITUS,
];

module.exports = {
    event: 'messageCreate',
    executor: async (msg) => {
        if (msg.guild === null) {
            // DMs
            return;
        }

        const scamLogs = msg.guild.channels.resolve(Channels.SCAM_LOGS) as TextChannel | null;
        if (scamLogs && msg.content.toLowerCase().includes('@everyone') && msg.author.bot === false && !(msg.channel instanceof DMChannel)) {
            let hasRole = false;
            try {
                excludedRoles.forEach((roleList) => {
                    if (msg.member.roles.cache.some((role) => role.id === roleList)) {
                        hasRole = true;
                    }
                });
            } catch (e) {
                Logger.error(e);
            }

            if (hasRole) {
                const allowedEmbed = makeEmbed({
                    title: 'Potential Scam Alert',
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/932350968522240101/932625886275043338/Approved.png' },
                    description: 'An allowed role has used @everyone',
                    author: {
                        name: msg.author.tag,
                        iconURL: msg.author.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        {
                            name: 'User:',
                            value: `${msg.author}`,
                        },
                        {
                            name: 'Channel:',
                            value: `${msg.channel}`,
                        },
                        {
                            name: 'Message Content:',
                            value: codeBlock(msg.content.toString()),
                        },
                    ],
                });

                await scamLogs.send({ embeds: [allowedEmbed] });
                return;
            }

            await msg.delete();

            const notAllowedEmbed = makeEmbed({
                title: 'Potential Scam Alert',
                thumbnail: { url: 'https://cdn.discordapp.com/attachments/932350968522240101/932625893657026630/Scam.png' },
                author: {
                    name: msg.author.tag,
                    iconURL: msg.author.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    {
                        name: 'User:',
                        value: `${msg.author}`,
                    },
                    {
                        name: 'Channel:',
                        value: `${msg.channel}`,
                    },
                    {
                        name: 'Message Content:',
                        value: codeBlock(msg.content.toString()),
                    },
                ],
            });
            try {
                await msg.member.timeout(60 * 60 * 24 * 7 * 1000, 'Scam log');
            } catch (e) {
                Logger.error(e);
                const errorEmbed = makeEmbed({
                    title: 'Error timing out user',
                    description: makeLines([
                        `An error occurred while timing out ${msg.author}`,
                        `${codeBlock(`Error : ${e}`)}`,
                    ]),
                    color: Colors.Red,
                });
                await scamLogs.send({ embeds: [errorEmbed] });

                await scamLogs.send({ embeds: [notAllowedEmbed] });
                return;
            }

            try {
                await msg.author.send('We have detected use of @everyone in one of our text channels. This function is in place to prevent discord scams and has resulted in an automatic timeout and notification of our moderation team. If this was done in error, our moderation team will reverse the timeout, however please refrain from using the @everyone ping in future.');
            } catch (e) {
                Logger.error(e);

                const noDMEmbed = makeEmbed({
                    author: {
                        name: msg.author.tag,
                        iconURL: msg.author.displayAvatarURL({ dynamic: true }),
                    },
                    description: `DM was not sent to ${msg.author.id}.`,
                });

                await scamLogs.send({ embeds: [noDMEmbed] });
            }

            await scamLogs.send({ embeds: [notAllowedEmbed] });
        }
    },
};
