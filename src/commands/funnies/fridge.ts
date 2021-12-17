import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const FRIDGE_URL = 'https://media.discordapp.net/attachments/898602626436964402/921199183430549524/samsung-family-hub-refrigerator-1_1024x1024.png';

export const fridge: CommandDefinition = {
    name: 'fridge',
    description: 'fridge',
    category: CommandCategory.FUNNIES,
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: FRIDGE_URL } })),
};
