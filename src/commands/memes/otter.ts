import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const otter: CommandDefinition = {
    name: 'otter',
    description: 'Well, it\'s an otter',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send('<:otter:905529385292029972>'),
};
