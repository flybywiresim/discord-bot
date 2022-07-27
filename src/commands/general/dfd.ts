import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const dfd: CommandDefinition = {
    name: ['dfd', 'digitalflightdynamics'],
    description: 'Provides link to the DFD discord server',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        await msg.channel.send('https://discord.gg/dfd');
    },
};
