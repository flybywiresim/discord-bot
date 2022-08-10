import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADDON_URL = 'https://cdn.discordapp.com/attachments/811229810193465344/904049458973646909/meme.png';

export const addon: CommandDefinition = {
    name: 'addon',
    description: 'addon not mod meme',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const addonEmbed = makeEmbed({ image: { url: ADDON_URL } });
        await msg.channel.send({ embeds: [addonEmbed] });
    },
};
