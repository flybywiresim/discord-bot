import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const BORIS_URL = `${imageBaseUrl}/memes/boris.gif`;

export const boris: CommandDefinition = {
    name: 'boris',
    description: 'boris soudn',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => {
        const borisEmbed = makeEmbed({ image: { url: BORIS_URL } });
        return msg.channel.send({ embeds: [borisEmbed] });
    },
};
