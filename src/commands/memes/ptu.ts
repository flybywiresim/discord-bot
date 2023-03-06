import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const PTU_URL = `${process.env.IMAGE_BASE_URL}memes/put.jpg`;

export const ptu: CommandDefinition = {
    name: 'ptu',
    description: 'Bark',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const ptuEmbed = makeEmbed({ image: { url: PTU_URL } });
        return msg.channel.send({ embeds: [ptuEmbed] });
    },
};
