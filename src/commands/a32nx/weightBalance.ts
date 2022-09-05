import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const weightBalance: CommandDefinition = {
    name: ['weights', 'fuel', 'wb', 'w/b', 'w+b', 'wnb', 'w&b'],
    category: CommandCategory.A32NX,
    description: 'Provides a link to the fuel and weights docs guide.',
    executor: (msg) => {
        const weightBalanceEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Fuel and Weight',
            description: makeLines([
                'We have improved the A32NX flight model and finalized our weight and balance loading integration.',
                '',
                '> **Please note:**',
                '> - We have disabled the MSFS fuel and weights UI to prevent issues.',
                '> - There are differences between Stable and Development versions.',
                '',
                '**Stable Version**',
                '- Use the EFB for fueling.',
                '- Use the AOC W/B Page on the MCDU for payload management.',
                '',
                '**Development Version**',
                '- Use the EFB Ground Page for both fueling and payload management.',
                '',
                'For detailed information please read [here.](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/loading-fuel-weight/)',
            ]),
        });

        return msg.channel.send({ embeds: [weightBalanceEmbed] });
    },
};
