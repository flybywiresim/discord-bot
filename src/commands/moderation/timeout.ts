import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { GuildMember } from 'discord.js';

enum TimeConversions {
    MINUTES_TO_MILLISECONDS = 60 * 1000,
    HOURS_TO_MILLISECONDS = 60 * 60 * 1000,
    DAYS_TO_MILLISECONDS = 60 * 60 * 24 * 1000,
    WEEKS_TO_MILLISECONDS = 60 * 60 * 24 * 7 * 1000,
}

const DMEmbed = () => makeEmbed({
    // stuff
});

const timeoutEmbed = (user: GuildMember, reason: string, timeoutLength: string) => makeEmbed({
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
            inline: true, // TODO: move this field to the second row somehow?
            name: 'Timeout Length',
            value: timeoutLength,
        },
    ],
    color: 'GREEN',
});

const modLogEmbed = () => makeEmbed({
    // stuff
});

export const timeout: CommandDefinition = {
    name: 'timeout',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const args = msg.content.replace(/\.timeout\s+/, '').split(' ');
        if (args.length < 3) {
            await msg.reply('You need to provide the following arguments for this command: <id> <timeoutLength> <reason>');
            return;
        }

        const id = args[0];
        const user = await msg.guild.members.fetch(id);
        const timeoutArg = args[1];
        const reason = args.slice(2).join(' ');

        let timeoutLength: number;
        switch (timeoutArg[timeoutArg.length - 1]) {
            default: {
                // defaults to minutes; 'm' will also run this block
                timeoutLength = parseInt(timeoutArg.replace('m', '')) * TimeConversions.MINUTES_TO_MILLISECONDS;
                break;
            }
            case 'h': {
                timeoutLength = parseInt(timeoutArg.slice(0, timeoutArg.length - 1)) * TimeConversions.HOURS_TO_MILLISECONDS;
                break;
            }
            case 'd': {
                timeoutLength = parseInt(timeoutArg.slice(0, timeoutArg.length - 1)) * TimeConversions.DAYS_TO_MILLISECONDS;
                break;
            }
            case 'w': {
                timeoutLength = parseInt(timeoutArg.slice(0, timeoutArg.length - 1)) * TimeConversions.WEEKS_TO_MILLISECONDS;
                break;
            }
        }

        await user.timeout(timeoutLength, reason);
        // todo: check if successful
        await msg.channel.send({ embeds: [timeoutEmbed(user, reason, timeoutArg)] });
    },
};
