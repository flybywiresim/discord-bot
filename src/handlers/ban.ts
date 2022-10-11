import { AuditLogEvent, bold, Colors, TextChannel, User } from 'discord.js';
import { Channels, ModLogsExclude } from '../constants';
import { makeEmbed, makeLines } from '../lib/embed';

const noLogEmbed = (user: User, guildName: string) => makeEmbed({
    color: Colors.Red,
    author: {
        name: `[BANNED] ${user.tag}`,
        iconURL: user.displayAvatarURL(),
    },
    description: makeLines([
        `${user.tag} was banned from ${guildName} but no audit log could be found.`,
        '',
        bold('NOTE - This was a non bot ban.'),
        '',
        `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
    ]),
    footer: { text: `User ID: ${user.id}` },
});

const userBannedEmbed = (user: User, executor: User, reason: string) => makeEmbed({
    color: Colors.Red,
    author: {
        name: `[BANNED] ${user.tag}`,
        iconURL: user.displayAvatarURL(),
    },
    description: makeLines([
        bold('NOTE - This was a non bot ban.'),
        '',
        `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
    ]),
    fields: [
        {
            name: 'Member',
            value: `${user}`,
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
    footer: { text: `User ID: ${user.id}` },
});

const userBannedIncompleteEmbed = (user: User) => makeEmbed({
    color: Colors.Red,
    author: {
        name: `[BANNED] ${user.tag}`,
        iconURL: user.displayAvatarURL(),
    },
    description: makeLines([
        bold('NOTE - This was a non bot ban.'),
        '',
        `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
    ]),
    fields: [
        {
            name: 'Member',
            value: user.tag,
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
    footer: { text: `User ID: ${user.id}` },
});

module.exports = {
    event: 'guildBanAdd',
    executor: async (msg) => {
        if (msg.guild === null) {
            // DMs
            return;
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        if (!modLogsChannel) {
            // Exit as can't post
            return;
        }

        const fetchedLogs = await msg.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MemberBanAdd,
        });

        const banLog = fetchedLogs.entries.first();
        if (!banLog) {
            await modLogsChannel.send({ embeds: [noLogEmbed(msg.user, msg.guild.name)] });
            return;
        }

        const { executor, reason, target } = banLog;
        if (target && target.id !== msg.user.id) {
            // Not the correct AuditLog MemberBanAdd entry
            // TODO: introduce retry loop with sleep and max number of retries
            await modLogsChannel.send({ embeds: [userBannedIncompleteEmbed(msg.user)] });
            return;
        }
        if (executor && ModLogsExclude.indexOf(executor.id) > -1) {
            // Ignore executor
            return;
        }

        await modLogsChannel.send({ embeds: [userBannedEmbed(msg.user, executor, reason)] });
    },
};
