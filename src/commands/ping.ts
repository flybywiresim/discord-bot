import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';

export const ping: CommandDefinition = {
    name: 'ping',
    category: CommandCategory.PUBLIC,
    executor: (msg) => {
        const contentsWithoutPing = msg.content.replace(/\.ping\s+/, '');

        msg.channel.send(contentsWithoutPing);
    },
};
