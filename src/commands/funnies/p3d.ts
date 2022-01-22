import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const P3D_URL = 'https://tenor.com/view/monkey-pissed-mad-angry-furious-gif-4720563';

export const p3d: CommandDefinition = {
    name: ['p3d', 'P3D'],
    description: 'No!',
    category: CommandCategory.FUNNIES,
    executor: async (msg) => {
        const p3dEmbed = makeEmbed({ image: { url: P3D_URL } });
        await msg.channel.send({ embeds: [p3dEmbed] });
    },
};
