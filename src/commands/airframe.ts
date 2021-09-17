import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const airframe: CommandDefinition = {
    name: ['airframe', 'simbrief'],
    description: 'Provides a link to the updated Simbrief airframe',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Simbrief Airframe',
        description: 'Our updated Simbrief airframe for the A32NX with correct weights is available [here](https://www.simbrief.com/system/dispatch.php?sharefleet=337364_1631550522735). This is a new airframe based on our updated flight model, and will always be kept up-to-date.'
    })),
};