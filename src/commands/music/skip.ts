import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const skip: CommandDefinition = {
    name: ['skip', 's'],
    description: 'Skips the current song playing and plays the next song in the queue.',
    category: CommandCategory.UTILS,
    executor: (msg) => distube.skip(msg),
};
