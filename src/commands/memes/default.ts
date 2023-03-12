import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const DEFAULT_URL = `${process.env.IMAGE_BASE_URL}memes/default.png`;

export const defaultmeme: CommandDefinition = {
    name: 'default',
    description: 'O_o',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const defaultEmbed = makeEmbed({ image: { url: DEFAULT_URL } });
        return msg.channel.send({ embeds: [defaultEmbed] });
    },
};
