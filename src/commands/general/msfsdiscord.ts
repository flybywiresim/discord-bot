import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const MSFS_DISCORD_LINK = 'https://discord.gg/BjEckUJUhe'

export const msfsdisc: CommandDefinition = {
    name: ['msfsdisc', 'fsdisc', 'msfsdiscord'],
    description: 'Provides link to Microsoft Flight Simulator discord server',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        await msg.channel.send(MSFS_DISCORD_LINK);
        await msg.delete();
    },
};
