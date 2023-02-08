import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADDON_URL = 'https://cdn.discordapp.com/attachments/740722295009706034/1072687692573315204/addon.png';

export const addon: CommandDefinition = {
    name: 'addon',
    description: 'addon not mod meme',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const addonEmbed = makeEmbed({ image: { url: ADDON_URL } });
        return msg.channel.send({ embeds: [addonEmbed] });
    },
};
