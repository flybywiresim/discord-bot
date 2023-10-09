import { CommandDefinition } from '../../lib/command';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const SHAME_URL = `${imageBaseUrl}/memes/shame.gif`;

export const shame: CommandDefinition = {
    name: 'shame',
    description: 'Shame, shame, shame',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(SHAME_URL),
};
