import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

let voteSkip = [];

export const skip: CommandDefinition = {
    name: ['skip', 's'],
    description: 'Skips the current song playing and plays the next song in the queue.',
    category: CommandCategory.MUSIC,
    executor: (msg) => {
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!');
        }
        const userCount = msg.member.voice.channel.members.size;
        const requiredSkip = Math.ceil(userCount / 2 - 1);
        const voteSkipCount = voteSkip.length + 1;
        if (voteSkip.includes(msg.member.id)) {
            return msg.channel.send('You have already voted to skip!')
        } if (voteSkipCount !== requiredSkip) {
            voteSkip.push(msg.member.id);
            return msg.channel.send(`Voted to skip (${voteSkipCount}/${requiredSkip})`);
        }
        distube.skip(msg);
        voteSkip = [];
    },
};
