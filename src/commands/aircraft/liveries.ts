import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const liveries: CommandDefinition = {
    name: ['liveries', 'liv'],
    description: 'Provides a link to the flightsim.to A32NX liveries page',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const liveriesEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Liveries',
            description: 'You can download liveries for the A32NX [here](https://flightsim.to/c/liveries/flybywire-a32nx/). To install, you will need to unzip the downloaded folder, then place it in your community folder.',
        });

        return msg.channel.send({ embeds: [liveriesEmbed] });
    },
};
