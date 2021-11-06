import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const printer: CommandDefinition = {
    name: 'freetext',
    description: 'Provides a link to the FlyByWire free text tutorial video',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | How do I use the Free Text feature?',
        description: 'Please watch our video tutorial on how to use the FlyByWire A32NX Free Text feature [here.](https://www.youtube.com/watch?v=xED3mXqzxTc)',
    })),
};

