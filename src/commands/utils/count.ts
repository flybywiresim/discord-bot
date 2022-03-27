import { TextChannel } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const COUNT_CHANNEL_ID = '877049017102659654';

export const count: CommandDefinition = {
    name: 'count',
    description: 'counts in the count thread',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        if (!msg.member.roles.cache.some((role) => role.name === 'Bot Developer')) {
            return msg.reply('Missing required role: Bot Developer');
        }
        const countNumber = msg.content.replace(/\.count\s*/, '');
        if (Number.isNaN(parseInt(countNumber))) {
            await msg.reply('Please provide a number');
        } else if (countNumber) {
            await (msg.client.channels.cache.get(COUNT_CHANNEL_ID) as TextChannel).send(`<@${msg.author}> says ${countNumber}`);
        }
    },
};
