import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const weightBalanceEmbed = makeEmbed({
    title: 'FlyByWire | Fuel and Weight Management',
    description: makeLines([
        'We have improved the flight model and integrated the weight and balance management into the EFB Ground Page.',
        '',
        'Use the EFB Ground Page for both fueling and payload management.',
        '',
        '> **Please note:** We have disabled the MSFS fuel and weights UI to avoid issues.',
        '',
        'For detailed information please read [here.](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/loading-fuel-weight/)',
    ]),
});

export const weightBalance: MessageCommandDefinition = {
    name: ['weights', 'fuel', 'wb', 'w/b', 'w+b', 'wnb', 'w&b'],
    category: CommandCategory.AIRCRAFT,
    description: 'Provides a link to the fuel and weights docs guide.',
    genericEmbed: weightBalanceEmbed,
};
