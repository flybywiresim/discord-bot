import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { Message } from 'discord.js';

const NO_HELLO_URL = 'https://nohello.net/';

export const noHello: CommandDefinition = {
    name: ['nohello', 'hello'],
    description: 'No!',
    category: CommandCategory.MEMES,
    executor: (msg: Message) => {
        const sentMsg = msg.fetchReference()
        .then((res) => res.reply(NO_HELLO_URL))
        .catch(() => msg.channel.send(NO_HELLO_URL));

        msg.delete();
        return sentMsg;
    },
};
