import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const MARSHALLER_URL = 'https://tenor.com/view/cute-girl-trying-to-warning-pilot-anime-meme-gif-21114064';

export const marshaller: CommandDefinition = {
    name: 'marshaller',
    description: 'The marshaller is always right',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const MARSHALLER_embed = makeEmbed({ image: { url: MARSHALLER_URL } });
        return msg.channel.send({ embeds: [MARSHALLER_embed] });
    },
};
