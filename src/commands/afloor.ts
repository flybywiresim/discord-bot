import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const afloor: CommandDefinition = {
    name: 'afloor',
    description: 'Provides a link to the Alpha Floor Tool-Tip',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Alpha Floor',
        description: 'Please see our [Alpha Floor Protection Tool-Tip](https://youtu.be/iXQb675J9mA) for information on Alpha Floor Protection and how to prevent/recover from it.',
    })),
};