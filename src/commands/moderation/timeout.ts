import { Guild, TextChannel, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Channels } from '../../constants';
import { makeEmbed } from '../../lib/embed';

enum TimeConversions {
    MINUTES_TO_MILLISECONDS = 60 * 1000,
    HOURS_TO_MILLISECONDS = 60 * 60 * 1000,
    DAYS_TO_MILLISECONDS = 60 * 60 * 24 * 1000,
    WEEKS_TO_MILLISECONDS = 60 * 60 * 24 * 7 * 1000,
}

const DMEmbed = (moderator: User, timeoutDuration: string, reason: string, guild: Guild) => makeEmbed({
    title: `You were muted in ${guild.name}`,
    author: {
        name: guild.name,
        icon_url: guild.iconURL(),
    },
    thumbnail: { url: moderator.avatarURL() },
    fields: [
        {
            inline: true,
            name: 'Duration',
            value: timeoutDuration,
        },
        {
            inline: true,
            name: 'Moderator',
            value: moderator.tag,
        },
        {
            inline: false,
            name: 'Reason',
            value: reason,
        },
    ],
});

const timeoutEmbed = (user: User, reason: string, timeoutDuration: string) => makeEmbed({
    title: 'User Successfully Timed Out',
    fields: [
        {
            inline: true,
            name: 'User',
            value: user.toString(),
        },
        {
            inline: true,
            name: 'ID',
            value: user.id,
        },
        {
            inline: false,
            name: 'Reason',
            value: reason,
        },
        {
            inline: true,
            name: 'Duration',
            value: timeoutDuration,
        },
    ],
    color: 'GREEN',
});

const modLogEmbed = (moderator: User, user: User, reason: string, timeoutDuration: string) => makeEmbed({
    color: 'RED',
    author: {
        name: `[TIMED OUT] ${user.tag}`,
        icon_url: user.displayAvatarURL({ dynamic: true }),
    },
    fields: [
        {
            name: 'Member',
            value: user.toString(),
        },
        {
            name: 'Moderator',
            value: `<@${moderator}>`,
        },
        {
            name: 'Reason',
            value: `\u200B${reason}`,
        },
        {
            name: 'Duration',
            value: timeoutDuration,
        },
    ],
    timestamp: Date.now(),
    footer: { text: `User ID: ${user.id}` },
});

export const timeout: CommandDefinition = {
    name: 'timeout',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const args = msg.content.replace(/\.timeout\s+/, '').split(' ');
        if (args.length < 3) {
            await msg.reply('You need to provide the following arguments for this command: <id> <timeoutDuration> <reason>');
            return;
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const id = args[0];
        const targetUser = await msg.guild.members.fetch(id);
        const timeoutArg = args[1];
        const reason = args.slice(2).join(' ');

        let timeoutDuration: number;
        switch (timeoutArg[timeoutArg.length - 1].toLowerCase()) {
            default: {
                // defaults to minutes; 'm' will also run this block
                timeoutDuration = parseInt(timeoutArg.replace('m', '')) * TimeConversions.MINUTES_TO_MILLISECONDS;
                break;
            }
            case 'h': {
                timeoutDuration = parseInt(timeoutArg.replace('h', '')) * TimeConversions.HOURS_TO_MILLISECONDS;
                break;
            }
            case 'd': {
                timeoutDuration = parseInt(timeoutArg.replace('d', '')) * TimeConversions.DAYS_TO_MILLISECONDS;
                break;
            }
            case 'w': {
                timeoutDuration = parseInt(timeoutArg.replace('w', '')) * TimeConversions.WEEKS_TO_MILLISECONDS;
                break;
            }
        }

        await targetUser.timeout(timeoutDuration, reason);
        // todo: check if successful
        await msg.channel.send({ embeds: [timeoutEmbed(targetUser.user, reason, timeoutArg)] });
        await modLogsChannel.send({ embeds: [modLogEmbed(msg.author, targetUser.user, reason, timeoutArg)] });
        await targetUser.send({ embeds: [DMEmbed(msg.author, timeoutArg, reason, msg.guild)] });
    },
};
