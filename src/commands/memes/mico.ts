import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const MICO_URL = `${process.env.IMAGE_BASE_URL}memes/mico.png`;

export const mico: CommandDefinition = {
    name: 'mico',
    description: 'mico!',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(MICO_URL),
};
