import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SHOMAS_URL = `${process.env.IMAGE_BASE_URL}memes/shomas.png`;

export const shomas: CommandDefinition = {
    name: 'shomas',
    description: 'oldest pilot',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const shomasEmbed = makeEmbed({ image: { url: SHOMAS_URL } });
        return msg.channel.send({ embeds: [shomasEmbed] });
    },
};
