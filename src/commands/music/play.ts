import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const play: CommandDefinition = {
    name: ['play', 'p'],
    description: 'Plays the top search result from youtube for the video title given.',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const args = msg.content.replace(/.play\s+/, ' ').split(' ');
        await distube.play(msg, args.join(' '));
    },
};
