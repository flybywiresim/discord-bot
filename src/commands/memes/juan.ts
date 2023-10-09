import { CommandDefinition } from '../../lib/command';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const JAUN_URL = `${imageBaseUrl}/memes/juan.png`;

export const juan: CommandDefinition = {
    name: 'juan',
    description: 'just... Jaun',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => {
        const juanEmbed = makeEmbed({ image: { url: JAUN_URL } });
        return msg.channel.send({ embeds: [juanEmbed] });
    },
};
