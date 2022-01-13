import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const COFFEE_URL = 'https://www.youtube.com/watch?v=QPfIeVnkZ4Q';

export const coffee: CommandDefinition = {
    name: 'coffee',
    description: 'Would you like some coffee?',
    category: CommandCategory.FUNNIES,
    executor: (msg) => {
        const coffeeEmbed = makeEmbed({ image: { url: COFFEE_URL } });
        return msg.channel.send({ embeds: [coffeeEmbed] });
    },
};
