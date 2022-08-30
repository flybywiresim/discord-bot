import { Colors, Snowflake, TextChannel, User } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

//mod logs embed
const modLogEmbed = (moderator: User, user: User, reason: string) => makeEmbed({
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
            value: `\u200B${reason}`,
        },
    ],
    footer: { text: ` User ID: ${(user instanceof User) ? user.id : user}` },
});

//DM to user
const dmEmbed = (formattedDate, moderator: User, user: User, reason: string) => makeEmbed({
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
            value: `\u200B${error}`,
        },
    ],
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

//If user has DM's disabled
const noDM = makeEmbed({
    title: 'Warn - DM not sent',
    description: 'User has DMs closed or has no mutual servers with the bot',
    color: Colors.Red,
});

export const ban: CommandDefinition = {
    name: 'ban',
    requiredPermissions: ['BanMembers'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.ban\s+/, '').split(' ');

        if (splitUp.length < 2) {
            await msg.reply('you did not provide enough arguments for this command. (<id> <reason>)');
            return Promise.resolve();
        }

        const idArg = splitUp[0];
        const reason = splitUp.slice(1).join(' ');

        const targetUser = await msg.guild.members.fetch(idArg);
        const moderator = msg.author;
        const currentDate = new Date();
        const formattedDate: string = moment(currentDate).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        //ban user then send mod log
        return msg.guild.members.ban(idArg).then((user: User | Snowflake) => {
            if (modLogsChannel && typeof user !== 'string') {
                modLogsChannel.send({ embeds: [modLogEmbed(moderator, targetUser.user, reason)] });
            }

            //send ban embed in channel
            msg.channel.send({ embeds: [successfulBanEmbed(targetUser.user, reason)] });
            //sends DM to user
            try {
                targetUser.send({ embeds: [dmEmbed(formattedDate, moderator, targetUser.user, reason)] });
            } catch {
                //sends msg if cant send DM
                msg.channel.send({ embeds: [noDM] });
            }
            //catches error if cant ban
        }).catch(async (error) => {
            //failed ban embed
            msg.channel.send({ embeds: [failedBanEmbed(targetUser.user, error)] });
        });
    },
};
