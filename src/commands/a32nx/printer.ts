import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const printer: CommandDefinition = {
    name: 'printer',
    description: 'Provides a link to the FlyByWire printer tutorial video',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | How do I use the printer?',
        description: 'Please watch our video tutorial on how to use the FlyByWire A32NX printer [here.](https://www.youtube.com/watch?v=i3ughyFtnCM)',
    })),
};

