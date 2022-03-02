import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const beginner: CommandDefinition = {
    name: ['beginnerguide', 'bg'],
    description: 'Provides a link to the Beginner Guide',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Beginner\'s Guide',
        description: 'Please see our [beginner\'s guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/overview/) for information on how to set up and fly the A32NX.',
    })),
};