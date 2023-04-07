import { Colors, TextChannel, User } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../../lib/command';
import { Channels, CommandCategory, RoleGroups } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';
import Warn from '../../../lib/schemas/warnSchema';

const noConnEmbed = makeEmbed({
    title: 'Warn - No Connection',
    description: 'Could not connect to the database',
    color: Colors.Red,
});

const warnEmbed = (user: User) => makeEmbed({
    title: `${user.tag} was warned successfully`,
    color: Colors.Green,
});

const modLogEmbed = (formattedDate, moderator: User, user: User, reason: string) => makeEmbed({
    author: {
        name: `[WARNED]  ${user.tag}`,
        iconURL: user.displayAvatarURL(),
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
    color: Colors.Red,
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

const warnFailed = makeEmbed({
    title: 'Warn - Failed',
    description: 'Failed to warn user, doc not saved to mongoDB',
    color: Colors.Red,
});

const noDM = makeEmbed({
    title: 'Warn - DM not sent',
    description: 'User has DMs closed or has no mutual servers with the bot',
    color: Colors.Red,
});

const noModLogs = makeEmbed({
    title: 'Warn - No Mod Log',
    description: 'The user was warned, but no mod log was sent. Please check the channel still exists',
    color: Colors.Red,
});

export const warn: CommandDefinition = {
    name: 'warn',
    requirements: { roles: RoleGroups.STAFF },
    description: 'Warns a user',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();

        if (!conn) {
            await msg.reply({ embeds: [noConnEmbed] });
            return;
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const args = msg.content.split(/\s+/).slice(1);

        if (args.length < 2 && parseInt(args[1]) !== 0) {
            await msg.reply('You need to provide the following arguments for this command: <id> <reason>');
            return;
        }

        const id = args[0];
        const targetUser = await msg.guild.members.fetch(id);
        const moderator = msg.author;
        const reason = args.slice(1).join(' ');
        const userID = targetUser.user.id;
        const currentDate = new Date();
        const formattedDate: string = moment(currentDate).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');

        const warnDoc = new Warn({
            userID,
            moderator,
            reason,
            date: currentDate,
        });

        try {
            await warnDoc.save();
        } catch {
            await msg.reply({ embeds: [warnFailed] });
            return;
        }

        try {
            await targetUser.send({ embeds: [dmEmbed(formattedDate, moderator, targetUser.user, reason)] });
        } catch {
            await msg.reply({ embeds: [noDM] });
        }

        try {
            await modLogsChannel.send({ embeds: [modLogEmbed(formattedDate, moderator, targetUser.user, reason)] });
        } catch {
            await msg.reply({ embeds: [noModLogs] });
            return;
        }
        await msg.reply({ embeds: [warnEmbed(targetUser.user)] });
    },
};
