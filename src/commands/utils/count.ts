import { TextChannel } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Roles, Threads } from '../../constants';

export const count: CommandDefinition = {
    name: 'count',
    description: 'counts in the count thread',
    category: CommandCategory.UTILS,
    requirements: {
        roles: [Roles.BOT_DEVELOPER],
        rolesError: 'Go count yourself',
    },
    executor: async (msg) => {
        const countThread = msg.guild.channels.resolve(Threads.COUNT_THREAD) as TextChannel | null;

        if (!countThread) {
            return msg.reply('That channel no longer exists');
        }

        const countNumber = msg.content.replace(/\.count\s*/, '');

        if (Number.isNaN(parseInt(countNumber))) {
            await msg.reply('Please provide a number');
        } else if (countNumber) {
            await (msg.client.channels.cache.get(Threads.COUNT_THREAD) as TextChannel).send(`${msg.author} says ${countNumber}`);
        }
        return msg.delete();
    },
};
