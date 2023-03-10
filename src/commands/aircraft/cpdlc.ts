import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const cpdlcEmbed = makeEmbed({
    title: 'FlyByWire A32NX | CPDLC/PDC',
    description: makeLines([
        'The A32NX now supports CPDLC/PDC via Hoppie ACARS for Vatsim/IVAO. This provides support for Controller to Pilot instructions, as well as requesting PDC (Pre-Departure Clearance), with more to come.',
        '',
        '**Check out our [docs](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/hoppie/) to learn how to get started!**',
    ]),
    footer: { text: 'Please Note: The Hoppie ACARS system is a complex system and we have decided to develop and release it step-by-step. Not all features are available in the early releases and additional functionality will be added over time.' },
});

export const CPDLC: MessageCommandDefinition = {
    name: ['cpdlc', 'pdc', 'hoppie', 'acars'],
    description: 'Provide info and docs link for Hoppie ACARS',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: cpdlcEmbed,
};
