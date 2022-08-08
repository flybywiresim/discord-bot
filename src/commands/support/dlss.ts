import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const dlss: CommandDefinition = {
    name: 'dlss',
    description: 'Explaination for the DLSS option in the MSFS graphics settings.',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const dlssEmbed = makeEmbed({
            title: 'MSFS | NVIDIA DLSS',
            description: makeLines([
                'Deep Learning Super Sampling (DLSS) is a graphics technology that renders content at a lower resolution, then upscales it to improve FPS. ',
                '',
                'You need to have an Nvidia GeForce RTX card to use the setting, and your results may vary with your hardware setup when using the feature.',
                '',
                'See [Nvidia\'s page on DLSS](https://www.nvidia.com/en-us/geforce/technologies/dlss/) for more information.',
            ]),
        });

        await msg.channel.send({ embeds: [dlssEmbed] });
    },
};
