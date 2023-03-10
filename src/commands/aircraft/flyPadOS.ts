import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const flyPadOSEmbed = makeEmbed({
    title: 'FlyByWire A32NX | flyPadOS Documentation',
    description: makeLines([
        'Please see our [flyPadOS 3 Documentation](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/) for information on how to set up and use the Electronic Flight Bag with flyPadOS 3.',
        '',
        'If you\'d like to immediately go to a specific chapter please use the list below:',
        '- [Overview](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/)',
        '- [Dashboard](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/dashboard/)',
        '- [Dispatch](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/dispatch/)',
        '- [Ground](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/ground/)',
        '- [Performance](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/performance/)',
        '- [Navigation & Charts](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/charts/)',
        '- [Online ATC](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/online-atc/)',
        '- [Failures](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/failures/)',
        '- [Interactive Checklists](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/checklists/)',
        '- [Interior Lighting and Aircraft Presets](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/presets/)',
        '- [Settings](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/settings/)',
        '- [Throttle Calibration](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/throttle-calibration/)',
    ]),
});

export const flyPadOS: MessageCommandDefinition = {
    name: ['flypados', 'flypad', 'efbos'],
    description: 'Provides a link to the flyPadOS documentation',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: flyPadOSEmbed,
};
