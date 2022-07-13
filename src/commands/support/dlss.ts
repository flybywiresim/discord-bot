import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const DLSS_URL = 'https://i0.wp.com/blog.cyberpowerpc.com/wp-content/uploads/2021/09/DLSS.jpg?fit=2556%2C1438&ssl=1';

export const dlss: CommandDefinition = {
    name: 'dlss',
    description: 'Explaination for the DLSS option in the MSFS graphics settings.',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const dlssEmbed = makeEmbed({
            title: 'MSFS | NVIDIA DLSS',
            description: makeLines([
                'Deep Learning Super Sampling (DLSS) is a new graphics technology that renders content at a lower resolution, then upscales it to improve FPS. ',
                '',
                'You need to have an Nvidia GeForce RTX card to use the setting, and your mileage may vary with respect to sim quality and performance when using the feature.',
                '',
                'See [Nvidia\'s page on DLSS](https://www.nvidia.com/en-us/geforce/technologies/dlss/) for more information.',
            ]),
            image: { url: DLSS_URL },
        });

        await msg.channel.send({ embeds: [dlssEmbed] });
    },
};
