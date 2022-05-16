import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const headwind: CommandDefinition = {
    name: ['headwind', 'hw'],
    description: 'Provides link to the Headwind Discord server',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        await msg.channel.send('https://discord.gg/SYanvKEX7B');
    },
};
