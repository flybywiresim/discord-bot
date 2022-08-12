import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const DLSS_IMAGE = 'https://media.discordapp.net/attachments/897491699167793182/1006801671592087572/dlss_poster.png?width=832&height=468';

export const dlss: CommandDefinition = {
    name: 'dlss',
    description: 'Explanation of the DLSS option in the MSFS graphics settings.',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const dlssEmbed = makeEmbed({
            title: 'MSFS | NVIDIA DLSS',
            description: makeLines([
                'Deep Learning Super Sampling (DLSS) is a graphics technology that renders content at a lower resolution, then upscales it to improve FPS.',
                '',
                'Note that this will affect display quality.',
                '',
                'You need to have an Nvidia GeForce RTX card to use the setting, and your results may vary with your hardware setup when using the feature.',
                '',
                'See [Nvidia\'s page on DLSS](https://www.nvidia.com/en-us/geforce/technologies/dlss/) for more information.',
            ]),

            image: { url: DLSS_IMAGE },
        });

        return msg.channel.send({ embeds: [dlssEmbed] });
    },
};
