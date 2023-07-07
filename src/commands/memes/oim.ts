import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const OIM_URL = `${imageBaseUrl}/memes/oim.gif`;

export const oim: CommandDefinition = {
    name: 'oim',
    category: CommandCategory.MEMES,
    description: 'oim',
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(OIM_URL),
};
