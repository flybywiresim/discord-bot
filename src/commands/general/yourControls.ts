import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const yourControls: CommandDefinition = {
    name: ['yourcontrols', 'yc'],
    description: 'Provides link to the YourControls Discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, 'https://discord.gg/p7Bzcv3Yjd'),
};
