import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const ping: CommandDefinition = {
    name: 'ping',
    description: 'Send back a message',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        const contentsWithoutPing = msg.content.replace(/\.ping\s+/, '');

        return msg.channel.send(contentsWithoutPing);
    },
};
