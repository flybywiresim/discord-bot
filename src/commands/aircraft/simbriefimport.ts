import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const simbriefImportEmbed = makeEmbed({
    title: 'FlyByWire A32NX | simBrief import',
    description: makeLines([
        'The A32NX has simBrief integration. This means you can create a flight plan in simBrief and import it into the FMS or EFB. Please refer to our [documentation](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/simbrief/) for instructions.',
    ]),
});

export const simbriefimport: MessageCommandDefinition = {
    name: ['import', 'integration', 'integ', 'simbrief'],
    description: 'Shows how to use SimBrief integration',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: simbriefImportEmbed,
};
