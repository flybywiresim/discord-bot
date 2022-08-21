import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const SHAME_URL = 'https://tenor.com/view/the-simpsons-homer-simpson-homer-good-bye-im-done-gif-3610339';

export const shame: CommandDefinition = {
    name: 'shame',
    description: 'Shame, shame, shame',
    category: CommandCategory.MEMES,
    executor: async (msg) => msg.channel.send(SHAME_URL),
};
