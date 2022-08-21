import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const salty: CommandDefinition = {
    name: ['salty', 'sal', 'ninjo'],
    description: 'Provides link to salty discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send('https://discord.gg/S4PJDwk'),
};
