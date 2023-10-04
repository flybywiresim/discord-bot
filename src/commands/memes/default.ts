import { CommandDefinition } from '../../lib/command';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const DEFAULT_URL = `${imageBaseUrl}/memes/default.gif`;

export const defaultmeme: CommandDefinition = {
    name: 'default',
    description: 'O_o',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => {
        const defaultEmbed = makeEmbed({ image: { url: DEFAULT_URL } });
        return msg.channel.send({ embeds: [defaultEmbed] });
    },
};
