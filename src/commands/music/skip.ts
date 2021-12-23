import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const skip: CommandDefinition = {
    name: ['skip', 's'],
    description: 'Skips the current song playing and plays the next song in the queue.',
    category: CommandCategory.MUSIC,
    executor: (msg) => {
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!');
        }
        return distube.skip(msg);
    },
};
