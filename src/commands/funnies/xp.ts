import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const XP_URL = 'https://tenor.com/view/austin-meyer-austin-slap-annoyed-xplane-gif-17303677';

export const xp: CommandDefinition = {
    name: ['xp', 'XPlane', 'X-Plane'],
    description: 'XPlane',
    category: CommandCategory.FUNNIES,
    executor: (msg) => {
        const xpEmbed = makeEmbed({ image: { url: XP_URL } });
        return msg.channel.send({ embeds: [xpEmbed] });
    },
};
