import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const BORATORIUM_URL = `${process.env.IMAGE_BASE_URL}memes/boratorium.png`;

export const boratorium: CommandDefinition = {
    name: 'boratorium',
    description: 'B O R A T',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const boratoriumEmbed = makeEmbed({ image: { url: BORATORIUM_URL } });
        return msg.channel.send({ embeds: [boratoriumEmbed] });
    },
};
