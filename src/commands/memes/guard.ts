import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const GUARD_URL = `${process.env.IMAGE_BASE_URL}memes/guard.gif`;

export const guard: CommandDefinition = {
    name: 'guard',
    description: 'MEOW',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(GUARD_URL),
};
