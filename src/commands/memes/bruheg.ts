import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const BRUHEG_URL = `${imageBaseUrl}/memes/bruheg.png`;

export const bruheg: CommandDefinition = {
    name: 'bruheg',
    description: 'bruheg momen',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => {
        const bruhegEmbed = makeEmbed({ image: { url: BRUHEG_URL } });
        return msg.channel.send({ embeds: [bruhegEmbed] });
    },
};
