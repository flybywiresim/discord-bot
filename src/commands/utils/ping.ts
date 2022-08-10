import Filter from 'bad-words';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const ping: CommandDefinition = {
    name: 'ping',
    description: 'Send back a message',
    category: CommandCategory.UTILS,
    requiredPermissions: ['ManageWebhooks'],
    executor: (msg) => {
        const msgFilter = new Filter();

        const text = msg.content.replace(/\.ping\s*/, '');

        if (!text || text.length === 0) {
            return msg.reply('Please provide some text.');
        }
        if (!msgFilter.isProfane(text)) {
            return msg.channel.send(text);
        }
        if (msgFilter.isProfane(text)) {
            return msg.reply('Please do not use profane language with this command.');
        }
        return Promise.resolve();
    },
};
