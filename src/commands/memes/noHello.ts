import { Message } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const NO_HELLO_URL = 'https://nohello.net/';

export const noHello: CommandDefinition = {
    name: ['nohello', 'hello'],
    description: 'No!',
    category: CommandCategory.MEMES,
    executor: async (msg: Message) => {
        const sentMsg = await msg
            .fetchReference()
            .then((res) => res.reply(NO_HELLO_URL))
            .catch(async () => msg.channel.send(NO_HELLO_URL));

        if (msg.content.split(/\s+|\n|\r|\.|-|>|\/|\\/).length <= 2) {
            msg.delete();
        }
        return sentMsg;
    },
};
