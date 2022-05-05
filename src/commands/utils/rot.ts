import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const rot: CommandDefinition = {
    name: ['ruleofthree', 'rot', 'ro3'],
    description: 'Roughly calculates TOD using the rule of 3',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const text = msg.content.split(' ').slice(1).join('');

        const altitude = parseInt(text.replace(/[^0-9.]/g, ''), 10);

        const error = 'Please specify a valid altitude or flight level.';

        const flightLevelError = 'Hint: Try appending \'FL\' to the beginning of values below 1000';

        const errorEmbed = makeEmbed({
            title: 'Error',
            description: error,
        });

        const flightLevelerrorEmbed = makeEmbed({
            title: 'Error',
            description: flightLevelError,
        });

        if (Number.isNaN(altitude)) {
            await msg.channel.send({ embeds: [errorEmbed] });
        } if (!msg.content.includes('FL') && altitude <= 1000) {
            await msg.channel.send({ embeds: [flightLevelerrorEmbed] });
        } if (altitude <= 1000 && text.startsWith('FL')) {
            const todFL = Math.floor(altitude * (1 / 3) * (11 / 10));
            const todFlightLevelEmbed = makeEmbed({
                title: 'FlyByWire | Descent Approximation',
                description: makeLines([
                    `To descend a total of **${altitude}00ft**, start a -3.0° descent **${todFL}nm** from the point you wish to reach the target altitude.`,
                    '',
                    'This is an approximation of your TOD using the rule of three. '
                    + 'See the official [guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/descent/#how-to-calculate-the-required-distance-for-descent) for planning an optimal descent.',
                ]),
            });
            await msg.channel.send({ embeds: [todFlightLevelEmbed] });
        } if (altitude >= 1000) {
            const topOfDescent = Math.floor(altitude * (1 / 100) * (1 / 3) * (11 / 10));
            const todEmbed = makeEmbed({

                title: 'FlyByWire | Descent Approximation',
                description: makeLines([
                    `To descend a total of **${altitude}ft**, start a -3.0° descent **${topOfDescent}nm** from the point you wish to reach the target altitude.`,
                    '',
                    'This is an approximation of your TOD using the rule of three. '
                    + 'See the official [guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/descent/#how-to-calculate-the-required-distance-for-descent) for planning an optimal descent.',
                ]),
            });

            await msg.channel.send({ embeds: [todEmbed] });
        }
    },
};
