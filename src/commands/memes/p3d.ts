import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const P3D_URL = `${imageBaseUrl}/memes/p3d.png`;

export const p3d: CommandDefinition = {
    name: 'p3d',
    description: 'No!',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(P3D_URL),
};
