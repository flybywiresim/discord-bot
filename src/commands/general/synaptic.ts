import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const synaptic: CommandDefinition = {
    name: ['synaptic', 'syn'],
    description: 'Provides link to synaptic discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send('https://discord.gg/acQkSvrePG'),
};
