import { Guild, TextChannel, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Channels } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { unTimeoutDMEmbed, unTimeoutModLogEmbed, unTimeoutEmbed } from './untimeout';

enum TimeConversions {
    MINUTES_TO_MILLISECONDS = 60 * 1000,
    HOURS_TO_MILLISECONDS = 60 * 60 * 1000,
    DAYS_TO_MILLISECONDS = 60 * 60 * 24 * 1000,
    WEEKS_TO_MILLISECONDS = 60 * 60 * 24 * 7 * 1000,
}

const timeoutDurationInEnglish = (timeoutDurationString: string) => {
    timeoutDurationString = timeoutDurationString.toLowerCase();
    const unitOfTimeWords = ['minute', 'hour', 'day', 'week'];
    const unitOfTimeAbbreviations = ['m', 'h', 'd', 'w'];
    const timeoutDurationNumber = parseInt(timeoutDurationString);

    let word!: string;
    for (const i of unitOfTimeAbbreviations) {
        if (timeoutDurationString.indexOf(i) !== -1) {
            word = unitOfTimeWords[unitOfTimeAbbreviations.indexOf(i)];
            break;
        }
    }
    if (!word) {
        [word] = unitOfTimeWords; // 'minute'
    }
    word += (timeoutDurationNumber > 1 || timeoutDurationNumber === 0 ? 's' : ''); // Determines plurality
    return `${timeoutDurationNumber} ${word}`;
};

const DMEmbed = (moderator: User, timeoutDuration: string, reason: string, guild: Guild, timedOutUntil: Date) => makeEmbed({
    title: `You were timed out in ${guild.name}`,
    author: {
        name: guild.name,
        icon_url: guild.iconURL(),
    },
    thumbnail: { url: moderator.avatarURL() },
    fields: [
        {
            inline: true,
            name: 'Duration',
            value: timeoutDurationInEnglish(timeoutDuration),
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
    footer: { text: `Your timeout will be lifted on ${timedOutUntil.toUTCString()}` },
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
            value: timeoutDurationInEnglish(timeoutDuration),
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
            value: timeoutDurationInEnglish(timeoutDuration),
        },
    ],
    timestamp: Date.now(),
    footer: { text: `User ID: ${user.id}` },
});

const failedTimeoutEmbed = (user: User) => (makeEmbed({
    title: 'Failed to timeout user',
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
    ],
    color: 'RED',
})
);

export const timeout: CommandDefinition = {
    name: 'timeout',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const args = msg.content.replace(/\.timeout\s+/, '').split(' ');
        if (args.length < 3 && parseInt(args[1]) !== 0) {
            return msg.reply('You need to provide the following arguments for this command: <id> <timeoutDuration> <reason>');
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

        if (timeoutDuration > 3 * TimeConversions.WEEKS_TO_MILLISECONDS) {
            return msg.reply('Cannot timeout a user for more than 3 weeks.');
        }

        return targetUser.timeout(timeoutDuration, reason).then(() => {
            if (timeoutDuration === 0) { // Timeout removed
                msg.channel.send({ embeds: [unTimeoutEmbed(targetUser.user)] });
                modLogsChannel.send({ embeds: [unTimeoutModLogEmbed(msg.author, targetUser.user)] });
                return targetUser.send({ embeds: [unTimeoutDMEmbed(msg.author, msg.guild)] });
            }

            if (targetUser.isCommunicationDisabled()) { // Timeout successful
                msg.channel.send({ embeds: [timeoutEmbed(targetUser.user, reason, timeoutArg)] });
                modLogsChannel.send({ embeds: [modLogEmbed(msg.author, targetUser.user, reason, timeoutArg)] });
                return targetUser.send({ embeds: [DMEmbed(msg.author, timeoutArg, reason, msg.guild, targetUser.communicationDisabledUntil)] });
            }

            return msg.channel.send({ embeds: [failedTimeoutEmbed(targetUser)] }); // Timeout unsuccessful
        });
    },
};
