import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import {error} from "winston";

export const tod: CommandDefinition = {
    name: ['tod', '3deg', 'descent'],
    description: 'Roughly calculates TOD using the rule of 3',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const text = msg.content.split(' ').slice(1).join('');
        const scope = msg.content.split(' ').slice(0).join('');
        const altitude = parseInt(text.replace(/[^0-9.]/g, ''), 10);
        const error = 'Please specify a valid altitude or flight level.';
        console.log(scope);

        if (Number.isNaN(altitude)) {
            return msg.channel.send(error);
        }

        if (!msg.content.includes('FL') && altitude <= 1000) {
            return msg.channel.send(error);
        }

        if (altitude <= 500) {
            const todFL = Math.floor(altitude * (1 / 3) * (11 / 10));
            return msg.channel.send(`Begin your descent at ${todFL} nm from touchdown.`);
        }
        const topOfDescent = Math.floor(altitude * (1 / 100) * (1 / 3) * (11 / 10));
        return msg.channel.send(`Begin your descent at ${topOfDescent} nm from touchdown.`);
    },
};
