import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const DLSS_IMAGE = `${imageBaseUrl}/support/dlss.png`;

const dlssEmbed = makeEmbed({
    title: 'MSFS | NVIDIA DLSS',
    description: makeLines([
        'When Deep Learning Super Sampling (DLSS) is enabled, the glass panel displays (PFD, ND, ECAMs and MCDU) might look blurry. This is a limitation of Microsoft Flight Simulator.',
        '',
        'DLSS is a graphics technology that renders content at a lower resolution to improve FPS, then upscales it using an AI algorithm.',
        '',
        'See [Nvidia\'s page on DLSS](https://www.nvidia.com/en-us/geforce/technologies/dlss/) for more information.',
    ]),

    image: { url: DLSS_IMAGE },
});

export const dlss: MessageCommandDefinition = {
    name: 'dlss',
    description: 'Explanation of the DLSS option in the MSFS graphics settings.',
    category: CommandCategory.SUPPORT,
    genericEmbed: dlssEmbed,
};
