import { CommandDefinition } from '../../lib/command';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const GUARD_URL = `${imageBaseUrl}/memes/guard.gif`;

export const guard: CommandDefinition = {
    name: 'guard',
    description: 'MEOW',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(GUARD_URL),
};
