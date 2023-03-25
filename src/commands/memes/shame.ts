import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';

const SHAME_URL = `${imageBaseUrl}/memes/shame.gif`;

export const shame: CommandDefinition = {
    name: 'shame',
    description: 'Shame, shame, shame',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(SHAME_URL),
};
