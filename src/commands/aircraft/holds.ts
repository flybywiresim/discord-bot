import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const holdsEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Holds documentation',
    description: 'Please see our [Holds documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-planning/holds/) for information about holds and how to configures them on the FlyByWire A32NX.',
});

export const holds: MessageCommandDefinition = {
    name: ['holds', 'hold', 'holding'],
    description: 'Provides a link to the Holds documentation.',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: holdsEmbed,
};
