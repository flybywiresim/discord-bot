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

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        const banLog = fetchedLogs.entries.first();

        if (modLogsChannel && !ModLogsExclude.some((e) => e)) {
            const noLogEmbed = makeEmbed({
                color: 'RED',
                author: {
                    name: `[BANNED] ${msg.user.tag}`,
                    icon_url: msg.user.displayAvatarURL({ dynamic: true }),
                },
                description: `${msg.user.tag} was banned from ${msg.guild.name} but no audit log could be found.`,
                footer: { text: `User ID: ${msg.user.id}` },
            });

            if (!banLog) await modLogsChannel.send({ embeds: [noLogEmbed] });
        }

        const {
            reason,
            executor,
            target,
        } = banLog;

        if (modLogsChannel && !ModLogsExclude.some((e) => e === executor.id)) {
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
                            value: `<@${msg.user.id}>`,
                        },
                        {
                            name: 'Moderator',
                            value: `<@${executor.id}>`,
                        },
                        {
                            name: 'Reason',
                            value: `\u200B${reason}`,
                        },
                    ],
                    footer: { text: `User ID: ${msg.user.id}` },
                });
                await modLogsChannel.send({ embeds: [userBannedEmbed] });
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
                await modLogsChannel.send({ embeds: [userBannedIncompleteEmbed] });
            }
        }
    },
};
