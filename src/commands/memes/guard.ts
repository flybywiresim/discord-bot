import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';

const GUARD_URL = `${imageBaseUrl}/memes/guard.gif`;

export const guard: CommandDefinition = {
    name: 'guard',
    description: 'MEOW',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(GUARD_URL),
};
