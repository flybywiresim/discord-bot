import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const autoland: CommandDefinition = {
    name: ['autoland'],
    description: 'Provides a link to the Autoland documentation.',
    category: CommandCategory.A32NX,
    executor: (msg) => {
        const autolandEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Autoland documentation',
            description: 'Please see our [Autoland documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/autoland/) for information about the Autoland feature on the FlyByWire A32NX.',
        });

        return msg.channel.send({ embeds: [autolandEmbed] });
    },
};
