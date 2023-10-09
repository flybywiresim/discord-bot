import { CommandDefinition } from '../../lib/command';
import { Channels, ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const MICO_URL = `${imageBaseUrl}/memes/mico.png`;

export const mico: CommandDefinition = {
    name: 'mico',
    description: 'mico!',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels.concat(Channels.SOUND),
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(MICO_URL),
};
