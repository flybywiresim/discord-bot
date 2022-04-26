import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const tod: CommandDefinition = {
    name: ['tod', '3deg', 'descent'],
    description: 'Roughly calculates TOD using the rule of 3',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const text = msg.content.split(' ');
        const args = text[1];
        const altitude = parseInt(args);

        if (Number.isNaN(altitude)) {
            return msg.channel.send('Please specify a valid altitude or flight level.');
        }

        if (altitude <= 500) {
            const todFL = Math.floor(altitude * (1 / 3) * (11 / 10));
            return msg.channel.send(`Begin your descent at ${todFL} nm from touchdown.`);
        }
        const topOfDescent = Math.floor(altitude * (1 / 100) * (1 / 3) * (11 / 10));
        return msg.channel.send(`Begin your descent at ${topOfDescent} nm from touchdown.`);
    },
};
