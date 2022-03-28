import { TextChannel } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Channels } from '../../constants';

export const count: CommandDefinition = {
    name: 'count',
    description: 'counts in the count thread',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        if (msg.client.channels.cache.get(Channels.COUNT_THREAD) as TextChannel === undefined) {
            return msg.reply('That channel no longer exists');
        }
        if (!msg.member.roles.cache.some((role) => role.name === 'Bot Developer')) {
            return msg.reply('Go count yourself');
        }
        const countNumber = msg.content.replace(/\.count\s*/, '');
        if (Number.isNaN(parseInt(countNumber))) {
            await msg.reply('Please provide a number');
        } else if (countNumber) {
            await (msg.client.channels.cache.get(Channels.COUNT_THREAD) as TextChannel).send(`<@${msg.author}> says ${countNumber}`);
        }
        await msg.delete();
    },
};
