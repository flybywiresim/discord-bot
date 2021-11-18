import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const ping: CommandDefinition = {
    name: 'ping',
    description: 'Send back a message',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        const text = msg.content.replace(/\.ping\s*/, '');

        if (text) {
            return msg.channel.send(text);
        }

        return msg.reply('please provide some text.');
    },
};
