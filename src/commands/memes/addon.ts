import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { ChannelGroups, CommandCategory, imageBaseUrl } from '../../constants';

const ADDON_URL = `${imageBaseUrl}/memes/addon.png`;

export const addon: CommandDefinition = {
    name: 'addon',
    description: 'addon not mod meme',
    category: CommandCategory.MEMES,
    requirements: {
        channels: ChannelGroups.LiberalChannels,
        verboseErrors: true,
    },
    executor: (msg) => {
        const addonEmbed = makeEmbed({ image: { url: ADDON_URL } });
        return msg.channel.send({ embeds: [addonEmbed] });
    },
};
