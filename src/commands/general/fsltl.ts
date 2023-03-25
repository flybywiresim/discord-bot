import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const fsltl: CommandDefinition = {
    name: ['fslivetrafficliveries', 'fsltl'],
    description: 'Provides link to the FS Live Traffic Liveries Discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, 'https://discord.gg/suMR56wCrn'),
};
