import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const FRIDGE_URL = 'https://media.discordapp.net/attachments/898602626436964402/921205269927706675/samsung-family-hub-refrigerator-1_1024x1024clean.png';

export const fridge: CommandDefinition = {
    name: 'fridge',
    description: 'fridge',
    category: CommandCategory.FUNNIES,
    executor: async (msg) => {
        const fridgeEmbed = makeEmbed({ image: { url: FRIDGE_URL } });
        await msg.channel.send({ embeds: [fridgeEmbed] });
    },
};
