import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const flyPadOS: CommandDefinition = {
    name: ['flypados', 'flypad', 'efbos'],
    description: 'Provides a link to the FlyPadOS documentation',
    category: CommandCategory.A32NX,
    executor: (msg) => {
        const flyPadOSEmbed = makeEmbed({
            title: 'FlyByWire A32NX | FlyPadOS Documentation',
            description: makeLines([
                'Please see our [flyPadOS3 Documentation](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/) for information on how to set up and use the Electronic Flight Bag with flyPadOS3.',
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
                '',
                'See the [flyPadOS2 documentation](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados2/) for the older version of flyPadOS.',
            ]),
        });

        return msg.channel.send({ embeds: [flyPadOSEmbed] });
    },
};
