import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const POGGERS_URL = 'https://tenor.com/view/lizard-dancing-poggers-lizard-dance-poggers-gif-18527737';

export const poggers: CommandDefinition = {
    name: ['poggers', 'pog'],
    description: 'POG',
    category: CommandCategory.FUNNIES,
    executor: async (msg) => {
        const poggersEmbed = makeEmbed({ image: { url: POGGERS_URL } });
        await msg.channel.send({ embeds: [poggersEmbed] });
    },
};
