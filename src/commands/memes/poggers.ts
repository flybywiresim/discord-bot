import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const POGGERS_URL = `${process.env.IMAGE_BASE_URL}memes/poggers.gif`;

export const poggers: CommandDefinition = {
    name: ['poggers', 'pog'],
    description: 'POG',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(POGGERS_URL),
};
