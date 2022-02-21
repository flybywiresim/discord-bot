import { TextChannel } from 'discord.js';
import { Channels, ModLogsExclude } from '../constants';
import { makeEmbed } from '../lib/embed';

module.exports = {
    event: 'guildBanAdd',
    executor: async (msg) => {
        if (msg.guild === null) {
            // DMs
            return;
        }
            const fetchedLogs = await msg.guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_ADD',
            });

            const banLog = fetchedLogs.entries.first();

        const noLogEmbed = makeEmbed({
            color: 'RED',
            author: {
                name: `[BANNED] ${msg.user.tag}`,
                icon_url: msg.user.displayAvatarURL({ dynamic: true }),
            },
            description: `${msg.user.tag} was banned from ${msg.guild.name} but no audit log could be found.`,
            footer: { text: `User ID: ${msg.user.id}` },
        });

            if (!banLog) return (msg.guild.channels.cache.find((channel) => channel.id === '945016209647239218') as TextChannel).send({ embeds: [noLogEmbed] });

            const {
                reason,
                executor,
                target
            } = banLog;

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        if (!ModLogsExclude.some((e) => e === executor.id) && modLogsChannel !== null) {
            if (target.id === msg.user.id) {
                const userBannedEmbed = makeEmbed({
                    color: 'RED',
                    author: {
                        name: `[BANNED] ${msg.user.tag}`,
                        icon_url: msg.user.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        {
                            name: 'Member',
                            value: msg.user.tag,
                        },
                        {
                            name: 'Moderator',
                            value: executor.tag,
                        },
                        {
                            name: 'Reason',
                            value: '\u200B' + reason,
                        },
                    ],
                    footer: { text: `User ID: ${msg.user.id}` },
                });
                await (msg.guild.channels.cache.find((channel) => channel.id === '945016209647239218') as TextChannel).send({ embeds: [userBannedEmbed] });
            } else {
                const userBannedIncompleteEmbed = makeEmbed({
                    color: 'RED',
                    author: {
                        name: `[BANNED] ${msg.user.tag}`,
                        icon_url: msg.user.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        {
                            name: 'Member',
                            value: msg.user.tag,
                        },
                        {
                            name: 'Moderator',
                            value: 'Unavailable - Audit log incomplete',
                        },
                        {
                            name: 'Reason',
                            value: 'Unavailable - Audit log incomplete',
                        },
                    ],
                    footer: { text: `User ID: ${msg.user.id}` },
                });
                await (msg.guild.channels.cache.find((channel) => channel.id === '945016209647239218') as TextChannel).send({ embeds: [userBannedIncompleteEmbed] });
            }
        }
    },
};
