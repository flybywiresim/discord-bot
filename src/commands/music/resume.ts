import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const resume: CommandDefinition = {
    name: ['resume', 'r'],
    description: 'Resumes the paused song',
    category: CommandCategory.MUSIC,
    executor: (msg) => {
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!');
        }

        const queue = distube.getQueue((msg));

        if (queue.paused === false) {
            return msg.channel.send('The song is already playing!')
        }
        distube.resume(msg);
    },
};
