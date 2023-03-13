import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';

const MICO_URL = `${imageBaseUrl}/memes/mico.png`;

export const mico: CommandDefinition = {
    name: 'mico',
    description: 'mico!',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(MICO_URL),
};
