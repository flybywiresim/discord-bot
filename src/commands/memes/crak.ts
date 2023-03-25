import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const CRAK_URL = `${imageBaseUrl}/memes/crak.png`;

export const crak: CommandDefinition = {
    name: 'crak',
    description: 'What\'s your sim version?',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const crakEmbed = makeEmbed({ image: { url: CRAK_URL } });
        return msg.channel.send({ embeds: [crakEmbed] });
    },
};
