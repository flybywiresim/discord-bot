import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const simbrief: CommandDefinition = {
    name: 'simbrief',
    description: 'Provides a link to the FlyByWire Simbrief integration tutorial video.',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Simbrief Integration',
        description: 'Watch a tutorial on how to use the FlyByWire A32NX Simbrief Integration [here](https://youtu.be/l_5J7ZuEEtk)',
    })),
};
