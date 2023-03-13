import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const navigraph: CommandDefinition = {
    name: ['navigraph'],
    description: 'Provides link to the Navigraph Discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, 'https://discord.gg/navigraph'),
};
