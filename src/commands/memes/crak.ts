import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const CRAK_URL = `${process.env.IMAGE_BASE_URL}memes/crak.png`;

export const crak: CommandDefinition = {
    name: 'crak',
    description: 'What\'s your sim version?',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const crakEmbed = makeEmbed({ image: { url: CRAK_URL } });
        return msg.channel.send({ embeds: [crakEmbed] });
    },
};
