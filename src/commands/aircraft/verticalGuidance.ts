import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const verticalGuidanceEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Vertical Guidance Documentation',
    description: makeLines([
        'Please see our [Vertical Guidance documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/overview/) for information on the VNAV capabilities of the FlyByWire A32NX.',
        '',
        'If you\'d like to immediately go to a specific chapter please use the list below:',
        '- [Overview](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/overview/)',
        '- [Selected Vertical Modes](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/selected-modes/)',
        '- [Managed Vertical Modes](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/managed-modes/)',
        '- [Speed/Mach Control](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/speed-control/)',
        '- [Navigation Display Symbols](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/nd-symbols/)',
        '- [Primary Flight Display Indications](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/pfd-indications/)',
        '- [Example Managed Flight](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/example/)',
    ]),
});

export const verticalGuidance: MessageCommandDefinition = {
    name: ['verticalguidance', 'vnavdoc', 'vnav'],
    description: 'Provides a link to the Vertical Guidance documentation',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: verticalGuidanceEmbed,
};
