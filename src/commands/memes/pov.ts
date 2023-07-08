import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const POV_URL = `${imageBaseUrl}/memes/pov_downscaled.gif`;

export const pov: CommandDefinition = {
    name: 'pov',
    description: 'Oof',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => {
        const povEmbed = makeEmbed({ image: { url: POV_URL } });
        return msg.channel.send({ embeds: [povEmbed] });
    },
};
