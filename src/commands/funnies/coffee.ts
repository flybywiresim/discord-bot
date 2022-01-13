import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const COFFEE_URL = 'https://www.youtube.com/watch?v=QPfIeVnkZ4Q';

export const coffee: CommandDefinition = {
    name: 'coffee',
    description: 'Would you like some coffee?',
    category: CommandCategory.FUNNIES,
    executor: async (msg) => {
        const coffeeEmbed = makeEmbed({ image: { url: COFFEE_URL } });
        await msg.channel.send({ embeds: [coffeeEmbed] });
    },
};
