import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const fsltl: CommandDefinition = {
    name: ['fslivetrafficliveries', 'fsltl'],
    description: 'Provides link to the FS Live Traffic Liveries Discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send('https://discord.gg/suMR56wCrn'),
};