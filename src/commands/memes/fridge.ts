import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const FRIDGE_URL = 'https://cdn.discordapp.com/attachments/945268463465803796/945269679658766366/samsung-family-hub-refrigerator-1_1024x1024clean.png';

export const fridge: CommandDefinition = {
    name: 'fridge',
    description: 'fridge',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const fridgeEmbed = makeEmbed({ image: { url: FRIDGE_URL } });
        await msg.channel.send({ embeds: [fridgeEmbed] });
    },
};
