import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADDON_URL = 'https://tenor.com/view/cute-girl-trying-to-warning-pilot-anime-meme-gif-21114064';

export const addon: CommandDefinition = {
    name: 'marshaller',
    description: 'The marshaller is always right',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const addonEmbed = makeEmbed({ image: { url: ADDON_URL } });
        return msg.channel.send({ embeds: [addonEmbed] });
    },
};
