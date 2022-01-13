import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const weightBalance: CommandDefinition = {
    name: ['weights', 'fuel', 'wb', 'w/b', 'w+b', 'wnb', 'w&b'],
    category: CommandCategory.A32NX,
    description: 'Provides a link to the fuel and weights docs guide.',
    executor: async (msg) => {
        const weightBalanceEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Fuel and Weight',
            description: makeLines([
                'We have recently improved the A32NX flight model and finalized our weight and balance loading integration available on the development version. Please note:',
                '',
                '- We have disabled the MSFS fuel and weights UI to prevent issues.',
                '',
                '- Use the EFB for fueling and the AOC W/B Page on the MCDU for payload.',
                '',
                'Please read our guide [here.](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/loading-fuel-weight/)',
            ]),
        });

        await msg.channel.send({ embeds: [weightBalanceEmbed] });

    },
};
