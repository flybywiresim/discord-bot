import { bold, Colors, User } from 'discord.js';
import { CommandDefinition } from '../../../lib/command';
import { Channels, CommandCategory } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';

const headsImage = 'https://cdn.discordapp.com/attachments/965984444861276296/1008984707461034044/unknown.png';
const tailsImage = 'https://cdn.discordapp.com/attachments/965984444861276296/1008984789203828818/unknown.png';

const wrongChannelEmbed = makeEmbed({
    title: 'Coin Flip | Wrong Channel',
    description: `This command can only be used in the <#${Channels.BOT_COMMANDS}> channel.`,
    color: Colors.Red,
});

const coinFlipEmbed = (flipResult: string, user: User) => makeEmbed({
    title: `Coin Flip | ${flipResult}`,
    description: `It's ${bold(flipResult)}!`,
    thumbnail: { url: flipResult === 'heads' ? headsImage : tailsImage },
    author: { name: user.username, iconURL: user.displayAvatarURL() },
    timestamp: new Date().toISOString(),
});

const coinSides = ['Heads', 'Tails'];

export const coinFlip: CommandDefinition = {
    name: ['coinflip', 'cf', 'flip'],
    description: 'Flips a coin.',
    category: CommandCategory.FUN,
    executor: async (msg) => {
        if (msg.channelId !== Channels.BOT_COMMANDS) {
            const sentEmbed = await msg.channel.send({ embeds: [wrongChannelEmbed] });

            await msg.delete();
            return setTimeout(() => {
                sentEmbed.delete();
            }, 10_000);
        }

        const flipResult = coinSides[Math.floor(Math.random() * coinSides.length)];

        return msg.reply({ embeds: [coinFlipEmbed(flipResult, msg.author)] });
    },
};
