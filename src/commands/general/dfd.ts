import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const dfd: CommandDefinition = {
    name: ['dfd'],
    description: 'Provides link to the Digital Flight Dynamics Discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, 'https://discord.gg/dfd'),
};
