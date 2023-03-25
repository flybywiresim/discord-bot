import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const salty: CommandDefinition = {
    name: ['salty', 'sal', 'ninjo'],
    description: 'Provides link to salty discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, 'https://discord.gg/S4PJDwk'),
};
