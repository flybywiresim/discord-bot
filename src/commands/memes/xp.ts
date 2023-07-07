import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const XP_URL = `${imageBaseUrl}/memes/xp.gif`;

export const xp: CommandDefinition = {
    name: ['xp', 'xplane', 'x-plane'],
    description: 'XPlane',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(XP_URL),
};
