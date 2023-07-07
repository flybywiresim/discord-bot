import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const BORATORIUM_URL = `${imageBaseUrl}/memes/boratorium.png`;

export const boratorium: CommandDefinition = {
    name: 'boratorium',
    description: 'B O R A T',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => {
        const boratoriumEmbed = makeEmbed({ image: { url: BORATORIUM_URL } });
        return msg.channel.send({ embeds: [boratoriumEmbed] });
    },
};
