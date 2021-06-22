import { CommandDefinition } from '../lib/command';

export const ping: CommandDefinition = {
    name: 'ping',
    executor: (msg) => {
        const contentsWithoutPing = msg.content.replace(/\.ping\s+/, '');

        msg.channel.send(contentsWithoutPing);
    },
};
