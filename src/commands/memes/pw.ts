import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const PW_URL = `${imageBaseUrl}/memes/pw.png`;

export const pw: CommandDefinition = {
    name: 'pw',
    description: 'Whale noises',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const pwEmbed = makeEmbed({ image: { url: PW_URL } });
        return msg.channel.send({ embeds: [pwEmbed] });
    },
};
