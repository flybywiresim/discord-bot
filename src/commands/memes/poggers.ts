import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';

const POGGERS_URL = `${imageBaseUrl}/memes/poggers.gif`;

export const poggers: CommandDefinition = {
    name: ['poggers', 'pog'],
    description: 'POG',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(POGGERS_URL),
};
