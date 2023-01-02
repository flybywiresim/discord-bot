import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const navigraph: CommandDefinition = {
    name: ['navigraph'],
    description: 'Provides link to the Navigraph Discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send('https://discord.gg/navigraph'),
};
