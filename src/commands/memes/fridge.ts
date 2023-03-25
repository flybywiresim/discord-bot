import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const FRIDGE_URL = `${imageBaseUrl}/memes/fridge.png`;

export const fridge: CommandDefinition = {
    name: 'fridge',
    description: 'fridge',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const fridgeEmbed = makeEmbed({ image: { url: FRIDGE_URL } });
        return msg.channel.send({ embeds: [fridgeEmbed] });
    },
};
