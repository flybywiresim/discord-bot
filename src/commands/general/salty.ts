import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const salty: CommandDefinition = {
    name: ['salty', 'sal'],
    description: 'Provides link to salty discord server',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        await msg.channel.send('https://discord.gg/bKgWXNpK9k');
        await msg.delete();
    },
};