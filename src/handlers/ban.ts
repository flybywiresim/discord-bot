import { Colors, TextChannel } from 'discord.js';
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
                color: Colors.Red,
                author: {
                    name: `[BANNED] ${msg.user.tag}`,
                    iconURL: msg.user.displayAvatarURL(),
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
                    color: Colors.Red,
                    author: {
                        name: `[BANNED] ${msg.user.tag}`,
                        iconURL: msg.user.displayAvatarURL(),
                    },
                    fields: [
                        {
                            name: 'Member',
                            value: `${msg.user}`,
                        },
                        {
                            name: 'Moderator',
                            value: `${executor.id}`,
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
                    color: Colors.Red,
                    author: {
                        name: `[BANNED] ${msg.user.tag}`,
                        iconURL: msg.user.displayAvatarURL(),
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
