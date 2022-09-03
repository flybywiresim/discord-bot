import { AuditLogEvent, bold, Colors, TextChannel } from 'discord.js';
import { Channels, ModLogsExclude } from '../constants';
import { makeEmbed, makeLines } from '../lib/embed';

module.exports = {
    event: 'guildBanAdd',
    executor: async (msg) => {
        if (msg.guild === null) {
            // DMs
            return;
        }

        const fetchedLogs = await msg.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberBanAdd,
        });

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        const banLog = fetchedLogs.entries.first();

        const {
            reason,
            executor,
            target,
        } = banLog;

        const noLogEmbed = makeEmbed({
            color: Colors.Red,
            author: {
                name: `[BANNED] ${msg.user.tag}`,
                iconURL: msg.user.displayAvatarURL(),
            },
            description: makeLines([
                `${msg.user.tag} was banned from ${msg.guild.name} but no audit log could be found.`,
                '',
                '**NOTE - This was a non bot ban.**',
                '',
                `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
            ]),
            footer: { text: `User ID: ${msg.user.id}` },
        });

        const userBannedEmbed = makeEmbed({
            color: Colors.Red,
            author: {
                name: `[BANNED] ${msg.user.tag}`,
                iconURL: msg.user.displayAvatarURL(),
            },
            description: makeLines([
                //'**NOTE - This was a non bot ban.**',
                bold('This was a non bot ban.'),
                '',
                `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
            ]),
            fields: [
                {
                    name: 'Member',
                    value: `${msg.user}`,
                },
                {
                    name: 'Moderator',
                    value: `${executor}`,
                },
                {
                    name: 'Reason',
                    value: reason || 'No reason provided',
                },
            ],
            footer: { text: `User ID: ${msg.user.id}` },
        });

        const userBannedIncompleteEmbed = makeEmbed({
            color: Colors.Red,
            author: {
                name: `[BANNED] ${msg.user.tag}`,
                iconURL: msg.user.displayAvatarURL(),
            },
            description: makeLines([
                '**NOTE - This was a non bot ban.**',
                '',
                `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
            ]),
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

        if (modLogsChannel && !ModLogsExclude.some((e) => e)) {
            if (!banLog) await modLogsChannel.send({ content: executor.toString(), embeds: [noLogEmbed] });
        }

        if (modLogsChannel && !ModLogsExclude.some((e) => e === executor.id)) {
            if (target.id === msg.user.id) {
                await modLogsChannel.send({ content: executor.toString(), embeds: [userBannedEmbed] });
            } else {
                await modLogsChannel.send({ content: executor.toString(), embeds: [userBannedIncompleteEmbed] });
            }
        }
    },
};
