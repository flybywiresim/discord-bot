import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const dfd: CommandDefinition = {
    name: ['dfd'],
    description: 'Provides link to the Digital Flight Dynamics Discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send('https://discord.gg/dfd'),
};
