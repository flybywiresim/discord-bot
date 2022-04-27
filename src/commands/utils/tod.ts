import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const tod: CommandDefinition = {
    name: ['tod', '3deg', 'descent'],
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
                description: `Begin your descent at about ${todFL} nm from touchdown.`,
            });

            await msg.channel.send({ embeds: [todFlightLevelEmbed] });

        } if (altitude >= 1000) {

            const topOfDescent = Math.floor(altitude * (1 / 100) * (1 / 3) * (11 / 10));

            const todEmbed = makeEmbed({
                title: 'FlyByWire | Descent Approximation',
                description: `Begin your descent at about ${topOfDescent} nm from touchdown.`,
            });

            await msg.channel.send({ embeds: [todEmbed] });
        }
    },
};
