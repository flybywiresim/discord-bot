import { CommandDefinition } from '../../lib/command';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const POGGERS_URL = `${imageBaseUrl}/memes/poggers.gif`;

export const poggers: CommandDefinition = {
    name: ['poggers', 'pog'],
    description: 'POG',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(POGGERS_URL),
};
