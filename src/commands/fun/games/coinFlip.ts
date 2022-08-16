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

const noGuessEmbed = makeEmbed({
    title: 'Coin Flip | No Guess',
    description: 'Please provide a guess. For example: `.coinflip heads`',
    color: Colors.Red,
});

const coinFlipEmbed = (hasWon: boolean, flipResult: string, user: User) => makeEmbed({
    title: `Coin Flip | You ${hasWon ? 'Won' : 'Lost'}!`,
    description: `It's ${bold(flipResult)}!`,
    thumbnail: { url: flipResult === 'heads' ? headsImage : tailsImage },
    author: { name: user.username, iconURL: user.displayAvatarURL() },
    timestamp: new Date().toISOString(),
});

export const coinFlip: CommandDefinition = {
    name: ['coinflip', 'cf'],
    description: 'Flips a coin and returns the result',
    category: CommandCategory.FUN,
    executor: async (msg) => {
        if (msg.channelId !== Channels.BOT_COMMANDS) {
            const sentEmbed = await msg.channel.send({ embeds: [wrongChannelEmbed] });

            await msg.delete();
            return setTimeout(() => {
                sentEmbed.delete();
            }, 10_000);
        }

        let hasWon = false;
        const side = ['heads', 'tails'];
        const flipResult = side[Math.floor(Math.random() * side.length)];

        const splitMsg = msg.content.replace(/\.coinflip|.cf\s+/, ' ').split(' ');
        let userGuess = splitMsg.slice(1).join(' ');

        if (!userGuess) {
            return msg.reply({ embeds: [noGuessEmbed] });
        }

        if (userGuess === 'heads' || 'h') {
            userGuess = 'heads';
        } else if (userGuess === 'tails' || 't') {
            userGuess = 'tails';
        }

        if (flipResult === userGuess) {
            hasWon = true;
        }

        return msg.reply({ embeds: [coinFlipEmbed(hasWon, flipResult, msg.author)] });
    },
};
