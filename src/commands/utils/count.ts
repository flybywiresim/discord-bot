import { TextChannel } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const COUNT_CHANNEL_ID = '957603196828807258'; // 877049017102659654

export const count: CommandDefinition = {
    name: 'count',
    description: 'counts in the count thread',
    category: CommandCategory.UTILS,
    requiredPermissions: ['MANAGE_WEBHOOKS'],
    executor: async (msg) => {
        const countNumber = msg.content.replace(/\.count\s*/, '');
        if (Number.isNaN(parseInt(countNumber))) {
            await msg.reply('Please provide a number');
        } else if (countNumber) {
            await (msg.client.channels.cache.get(COUNT_CHANNEL_ID) as TextChannel).send(`<@${msg.author}> says ${countNumber}`);
        }
    },
};
