import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const GUARD_URL = 'https://tenor.com/view/cat-meow-big-lips-gif-13233291';

export const guard: CommandDefinition = {
    name: 'guard',
    description: 'MEOW',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        await msg.channel.send(GUARD_URL);
    },
};
