import { AuditLogEvent, bold, Colors, TextChannel, User } from 'discord.js';
import { Channels, ModLogsExclude } from '../constants';
import { makeEmbed, makeLines } from '../lib/embed';
import Logger from '../lib/logger';

const MAX_RETRIES = 5;
const SLEEP_TIMER = 0.5 * 1000;

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
    executor: async (guildBanAdd) => {
        Logger.debug('Starting Ban Handler');
        if (guildBanAdd.guild === null) {
            // DMs
            return;
        }

        const modLogsChannel = await guildBanAdd.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        if (!modLogsChannel) {
            // Exit as can't post
            return;
        }

        let executor;
        let reason;
        let target;
        let retryCount = MAX_RETRIES;
        do {
            Logger.debug(`Ban Handler - Finding Audit Log entry retries left: ${retryCount}`);
            if (retryCount < MAX_RETRIES) {
                // eslint-disable-next-line no-await-in-loop
                await new Promise((f) => setTimeout(f, SLEEP_TIMER));
            }
            // eslint-disable-next-line no-await-in-loop
            const fetchedLogs = await guildBanAdd.guild.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.MemberBanAdd,
            });
            const banLog = fetchedLogs.entries.first();
            if (banLog) {
                ({ executor, reason, target } = banLog);
            }
            retryCount--;
        }
        while ((!target || target.id !== guildBanAdd.user.id) && retryCount > 0);

        if (!target) {
            await modLogsChannel.send({ embeds: [noLogEmbed(guildBanAdd.user, guildBanAdd.guild.name)] });
            return;
        }
        if (target.id !== guildBanAdd.user.id) {
            await modLogsChannel.send({ embeds: [userBannedIncompleteEmbed(guildBanAdd.user)] });
            return;
        }
        if (executor && ModLogsExclude.indexOf(executor.id) < 0) {
            await modLogsChannel.send({ content: executor.toString(), embeds: [userBannedEmbed(guildBanAdd.user, executor, reason)] });
        }
    },
};
