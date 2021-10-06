import { CommandDefinition } from '../lib/command';
import { makeEmbed, makeLines } from '../lib/embed';
import { CommandCategory } from '../constants';

export const clean: CommandDefinition = {
    name: ['clean', 'clean install', 'order66'],
    description: 'Clean Install',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Clean Install',
        description: makeLines([
            'Content Here',
        ]),
    })),
};