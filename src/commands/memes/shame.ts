import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const SHAME_URL = `${process.env.IMAGE_BASE_URL}memes/shame.gif`;

export const shame: CommandDefinition = {
    name: 'shame',
    description: 'Shame, shame, shame',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(SHAME_URL),
};
