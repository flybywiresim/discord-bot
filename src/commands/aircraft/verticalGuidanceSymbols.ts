import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const verticalGuidanceSymbolsEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Vertical Guidance Navigation Display Symbols documentation',
    description: 'Please see our [Vertical Guidance Navigation Display Symbols documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/nd-symbols/) for information on the VNAV symbols on the ND of the FlyByWire A32NX.',
});

export const verticalGuidanceSymbols: MessageCommandDefinition = {
    name: ['verticalguidancesymbols', 'vnavsymbols', 'vnavnd'],
    description: 'Provides a link to the Vertical Guidance ND Symbols',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: verticalGuidanceSymbolsEmbed,
};
