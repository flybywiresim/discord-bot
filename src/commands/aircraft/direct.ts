import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const directEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Direct documentation',
    description: 'Please see our [Direct documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-planning/direct/) for information on the Direct feature of the MCDU on the FlyByWire A32NX.',
});

export const direct: MessageCommandDefinition = {
    name: ['direct', 'directto', 'dirto'],
    description: 'Provides a link to the Direct documentation.',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: directEmbed,
};
