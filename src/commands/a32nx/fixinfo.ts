import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const FIX_INFO_URL = 'https://docs.flybywiresim.com/fbw-a32nx/assets/fixinfo/nd-orl-fixinfo2.png';

export const fixinfo: CommandDefinition = {
    name: 'fixinfo',
    description: 'Provide information about the fix info feature.',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Fix Info',
        description: makeLines([
            'The A320 comes with a feature called fix info, which allows you to create radiuses and radials around a waypoint.',
            '',
            '**To access the fix info page:**',
            ' - Go to the MCDU FPLN page,',
            ' - Select the left LSK of the top most waypoint,',
            ' - Select the fix info page at the top right.',
            '',
            'Check out our [docs](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/fixinfo/?h=fix+info) for more information on this feature.',
        ]),
        image: { url: FIX_INFO_URL },
        footer: { text: 'Please Note: The computed intercept waypoints and ABEAM functionality are not yet implemented.' },
    })),
};
