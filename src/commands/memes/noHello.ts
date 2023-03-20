import { Message } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const NO_HELLO_URL = 'https://nohello.net/';

export const noHello: CommandDefinition = {
    name: ['nohello', 'hello'],
    description: 'No!',
    category: CommandCategory.MEMES,
    executor: (msg: Message) => {
        const sentMsg = await msg
          .fetchReference()
          .then((res) => res.reply(NO_HELLO_URL))
          .catch(() => msg.channel.send(NO_HELLO_URL));

        msg.delete();
        return sentMsg;
    },
};
