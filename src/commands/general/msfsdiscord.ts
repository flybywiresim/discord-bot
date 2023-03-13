import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

const MSFS_DISCORD_LINK = 'https://discord.gg/msfs';

export const msfsdisc: CommandDefinition = {
    name: ['msfsdisc', 'fsdisc', 'msfsdiscord'],
    description: 'Provides link to Microsoft Flight Simulator discord server',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, MSFS_DISCORD_LINK),
};
