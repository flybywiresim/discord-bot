import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const PTU_URL = `${imageBaseUrl}/memes/ptu.jpg`;

export const ptu: CommandDefinition = {
    name: 'ptu',
    description: 'Bark',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const ptuEmbed = makeEmbed({ image: { url: PTU_URL } });
        return msg.channel.send({ embeds: [ptuEmbed] });
    },
};
