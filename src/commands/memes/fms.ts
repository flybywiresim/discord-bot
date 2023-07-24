import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { Channels, CommandCategory, imageBaseUrl } from '../../constants';

const FMS_URL = `${imageBaseUrl}/memes/fms.png`;

export const fms: CommandDefinition = {
    name: 'fms',
    description: 'That\'s how the real FMS draws it',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => {
        const fmsEmbed = makeEmbed({ image: { url: FMS_URL } });
        return msg.channel.send({ embeds: [fmsEmbed] });
    },
};
