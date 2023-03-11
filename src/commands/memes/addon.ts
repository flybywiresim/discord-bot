import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADDON_URL = `${process.env.IMAGE_BASE_URL}memes/addon.png`;

export const addon: CommandDefinition = {
    name: 'addon',
    description: 'addon not mod meme',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const addonEmbed = makeEmbed({ image: { url: ADDON_URL } });
        return msg.channel.send({ embeds: [addonEmbed] });
    },
};
