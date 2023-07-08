import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const FRIDGE_URL = `${imageBaseUrl}/memes/fridge.png`;

export const fridge: CommandDefinition = {
    name: 'fridge',
    description: 'fridge',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => {
        const fridgeEmbed = makeEmbed({ image: { url: FRIDGE_URL } });
        return msg.channel.send({ embeds: [fridgeEmbed] });
    },
};
