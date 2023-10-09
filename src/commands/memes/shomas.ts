import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const SHOMAS_URL = `${imageBaseUrl}/memes/shomas.png`;

export const shomas: CommandDefinition = {
    name: 'shomas',
    description: 'oldest pilot',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => {
        const shomasEmbed = makeEmbed({ image: { url: SHOMAS_URL } });
        return msg.channel.send({ embeds: [shomasEmbed] });
    },
};
