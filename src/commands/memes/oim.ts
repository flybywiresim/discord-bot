import { CommandDefinition } from '../../lib/command';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const OIM_URL = `${imageBaseUrl}/memes/oim.gif`;

export const oim: CommandDefinition = {
    name: 'oim',
    category: CommandCategory.MEMES,
    description: 'oim',
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send(OIM_URL),
};
