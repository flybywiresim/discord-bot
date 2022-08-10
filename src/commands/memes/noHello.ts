import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const NO_HELLO_URL = 'https://nohello.net/';

export const noHello: CommandDefinition = {
    name: ['nohello', 'hello'],
    description: 'No!',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        await msg.channel.send(NO_HELLO_URL);
        return msg.delete();
    },
};
