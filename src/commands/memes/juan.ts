import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const JAUN_URL = `${imageBaseUrl}/memes/juan.png`;

export const juan: CommandDefinition = {
    name: 'juan',
    description: 'just... Jaun',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => {
        const juanEmbed = makeEmbed({ image: { url: JAUN_URL } });
        return msg.channel.send({ embeds: [juanEmbed] });
    },
};
