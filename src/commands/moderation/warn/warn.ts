import { TextChannel, User } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../../lib/command';
import { Roles, Channels, CommandCategory } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];

const warnEmbed = (user: User) => makeEmbed({
    title: `${user.tag} was warned successfully`,
    color: 'GREEN',
});

const modLogEmbed = (formattedDate, moderator: User, user: User, reason: string) => makeEmbed({
    author: {
        name: `[WARNED]  ${user.tag}`,
        icon_url: user.displayAvatarURL({ dynamic: true }),
    },
    fields: [
        {
            inline: false,
            name: 'User',
            value: user.toString(),
        },
        {
            inline: false,
            name: 'Moderator',
            value: moderator.toString(),
        },
        {
            inline: false,
            name: 'Reason',
            value: reason,
        },
        {
            inline: false,
            name: 'Date',
            value: formattedDate,
        },
    ],
    footer: { text: `User ID: ${user.id}` },
    color: 'RED',
});

const dmEmbed = (formattedDate, moderator: User, user: User, reason: string) => makeEmbed({

    title: 'You have been warned in FlyByWire Simulations',
    fields: [
        {
            inline: false,
            name: 'Moderator',
            value: moderator.toString(),
        },
        {
            inline: false,
            name: 'Reason',
            value: reason,
        },
        {
            inline: false,
            name: 'Date',
            value: formattedDate,
        },
    ],
});

const noPermEmbed = makeEmbed({
    title: 'Warn',
    description: 'You do not have permission to use this command.',
    color: 'RED',
});

const warnFailed = makeEmbed({
    title: 'Warn - Failed',
    description: 'Failed to warn user, doc not saved to mongoDB',
    color: 'RED',
});

const noDM = makeEmbed({
    title: 'Warn - DM not sent',
    description: 'User has DMs closed or has no mutual servers with the bot',
    color: 'RED',
});

const noModLogs = makeEmbed({
    title: 'Warn - No Mod Log',
    description: 'The user was warned, but no mod log was sent. Please check the channel still exists',
    color: 'RED',
});

export const warn: CommandDefinition = {
    name: 'warn',
    requiredPermissions: ['BAN_MEMBERS'],
    description: 'Warns a user',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();

        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));

        const args = msg.content.split(/\s+/).slice(1);

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        if (!hasPermittedRole) {
            await msg.channel.send({ embeds: [noPermEmbed] });
        } else if (args.length < 2 && parseInt(args[1]) !== 0) {
            return msg.reply('You need to provide the following arguments for this command: <id> <reason>');
        } else {
            const id = args[0];
            const targetUser = await msg.guild.members.fetch(id);
            const moderator = msg.author;
            const reason = args.slice(1).join(' ');
            const userID = targetUser.user.id;
            const currentDate = new Date();
            const formattedDate: string = moment(currentDate).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');

            const warnDoc = new conn.models.Warn({
                userID,
                moderator,
                reason,
                date: currentDate,
            });

            try {
                await warnDoc.save();
            } catch {
                return msg.channel.send({ embeds: [warnFailed] });
            }

            await targetUser.send({ embeds: [dmEmbed(formattedDate, moderator, targetUser.user, reason)] })
                .catch(() => {
                    msg.channel.send({ embeds: [noDM] });
                });

            try {
                await modLogsChannel.send({ embeds: [modLogEmbed(formattedDate, moderator, targetUser.user, reason)] });
            } catch {
                return msg.channel.send({ embeds: [noModLogs] });
            }

            await msg.channel.send({ embeds: [warnEmbed(targetUser.user)] });
        }
    },
};
