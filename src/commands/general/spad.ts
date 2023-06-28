import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const spad: CommandDefinition = {
    name: ['spad'],
    description: 'Provides link to the SPAD.neXt discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, 'https://discord.gg/sRwcWkB'),
};
