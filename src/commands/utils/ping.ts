import Filter from 'bad-words';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Roles, Channels } from '../../constants';

export const ping: CommandDefinition = {
    name: 'ping',
    description: 'Send back a message',
    category: CommandCategory.UTILS,
    requirements: {
        permissions: ['ManageWebhooks'],
        roles: [Roles.ADMIN_TEAM],
        channels: [Channels.BOT_COMMANDS, Channels.MOD_LOGS],
        verboseErrors: true
    },
    executor: (msg) => {
        const msgFilter = new Filter();

        const text = msg.content.replace(/\.ping\s*/, '');

        if (!text || text.length === 0) {
            return msg.reply('Please provide some text.');
        }
        if (!msgFilter.isProfane(text)) {
            return msg.channel.send(text);
        } else {
            return msg.reply('Please do not use profane language with this command.');
        }
    },
};
