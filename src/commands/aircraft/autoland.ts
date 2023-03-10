import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const autolandEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Autoland documentation',
    description: 'Please see our [Autoland documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/autoland/) for information about the Autoland feature on the FlyByWire A32NX.',
});

export const autoland: MessageCommandDefinition = {
    name: ['autoland'],
    description: 'Provides a link to the Autoland documentation.',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: autolandEmbed,
};
