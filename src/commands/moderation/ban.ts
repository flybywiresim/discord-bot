import { Colors, TextChannel, User } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, RoleGroups } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const moderatableFailEmbed = makeEmbed({
    color: Colors.Red,
    description: 'You can\'t ban a moderator!',
});

const modLogEmbed = (formattedDate, moderator: User, user: User, reason: string, deleteDays: string) => makeEmbed({
    color: Colors.Red,
    author: {
        name: `[BANNED] ${user.tag}`,
        iconURL: user.displayAvatarURL(),
    },
    fields: [
        {
            name: 'Member',
            value: user.toString(),
        },
        {
            name: 'Moderator',
            value: moderator.toString(),
        },
        {
            name: 'Reason',
            value: reason,
        },
        {
            name: 'Days of messages deleted',
            value: deleteDays,
        },
        {
            inline: false,
            name: 'Date',
            value: formattedDate,
        },
    ],
    footer: { text: ` User ID: ${user.id}` },
});

const successfulBanEmbed = (user: User, reason: string) => makeEmbed({
    title: 'User Successfully Banned',
    color: Colors.Green,
    fields: [
        {
            inline: true,
            name: 'Username',
            value: user.toString(),
        },
        {
            inline: true,
            name: 'ID',
            value: (user instanceof User) ? user.id : user,
        },
        {
            inline: false,
            name: 'Reason',
            value: reason,
        },
    ],
});

const failedBanEmbed = (user: User, error: any) => makeEmbed({
    title: 'Failed to Ban User',
    color: Colors.Red,
    fields: [
        {
            inline: true,
            name: 'Username',
            value: user.toString(),
        },
        {
            inline: true,
            name: 'ID',
            value: user.id,
        },
        {
            inline: false,
            name: 'Error',
            value: error.toString() || 'No error provided',
        },
    ],
});

const unknownUserEmbed = (userId: string) => makeEmbed({
    title: 'Failed to Ban User - Unknown user',
    color: Colors.Red,
    description: `Can not ban an unknown user ${userId}. Please verify the User ID and if it is correct, the user is not a member of the server.`,
});

const dmEmbed = (formattedDate, moderator: User, reason: string) => makeEmbed({
    title: 'You have been banned from FlyByWire Simulations',
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
        {
            inline: false,
            name: 'Appeal',
            value: `If you would like to appeal your ban, please fill out [this form.](${process.env.BAN_APPEAL_URL})`,
        },
    ],
});

const noDM = (user: User) => makeEmbed({
    title: 'Ban - DM not sent',
    description: makeLines([
        `${user.toString()} has DMs closed or has no mutual servers with the bot`,
        '',
        `Please remember to send the user the reason they were banned and the ban appeal form - ${process.env.BAN_APPEAL_URL}`,
    ]),
    color: Colors.Red,
});

export const ban: CommandDefinition = {
    name: 'ban',
    requirements: { roles: RoleGroups.STAFF },
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.ban\s+/, '').split(' ');
        if (splitUp.length < 3) {
            await msg.reply('You did not provide enough arguments for this command. (<id> <days> <reason>)');
            return Promise.resolve();
        }
        const idArg = splitUp[0];
        const deleteDays = splitUp[1];
        const reason = splitUp.slice(2).join(' ');
        const deleteDaysNumber = Number(deleteDays);
        if (Number.isNaN(deleteDaysNumber)) {
            await msg.reply('You did not provide enough arguments for this command. (<id> <days> <reason>)');
            return Promise.resolve();
        }
        if (!(deleteDaysNumber >= 0 && deleteDaysNumber <= 7)) {
            await msg.reply('<Days> needs to be between and including 0 and 7.');
            return Promise.resolve();
        }
        let targetUser;
        try {
            targetUser = await msg.guild.members.fetch(idArg);
        } catch {
            return msg.reply({ embeds: [unknownUserEmbed(idArg)] });
        }
        const moderator = msg.author;
        const currentDate = new Date();
        const formattedDate: string = moment(currentDate).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');
        const modLogsChannel = await msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        if (!targetUser.moderatable) {
            return msg.reply({ embeds: [moderatableFailEmbed] });
        }
        try {
            await targetUser.send({ embeds: [dmEmbed(formattedDate, moderator, reason)] });
        } catch {
            await modLogsChannel.send({ content: moderator.toString(), embeds: [noDM(targetUser.user)] });
        }
        try {
            const user = await msg.guild.members.ban(idArg, { deleteMessageDays: deleteDaysNumber, reason });
            if (modLogsChannel && typeof user !== 'string') {
                await modLogsChannel.send({ embeds: [modLogEmbed(formattedDate, moderator, targetUser.user, reason, deleteDays)] });
            }
            return msg.reply({ embeds: [successfulBanEmbed(targetUser.user, reason)] });
        } catch (error) {
            return msg.reply({ embeds: [failedBanEmbed(targetUser.user, error)] });
        }
    },
};
