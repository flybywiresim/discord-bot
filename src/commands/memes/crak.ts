import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const CRAK_URL = `${imageBaseUrl}/memes/crak.png`;

export const crak: CommandDefinition = {
    name: 'crak',
    description: 'What\'s your sim version?',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => {
        const crakEmbed = makeEmbed({ image: { url: CRAK_URL } });
        return msg.channel.send({ embeds: [crakEmbed] });
    },
};
