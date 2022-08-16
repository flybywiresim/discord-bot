import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const COFFEE_URL = 'https://www.youtube.com/watch?v=QPfIeVnkZ4Q';

export const coffee: CommandDefinition = {
    name: 'coffee',
    description: 'Would you like some coffee?',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(COFFEE_URL),
};
