import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const FMA_IMAGE_URL = `${imageBaseUrl}/a32nx/fma.png`;

const fmaEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Flight Mode Annunciator ',
    description: makeLines([
        'The Flight Mode Annunciator (FMA) at the top of the PFD shows the status of the A/THR, the AP/FD vertical and lateral modes, the approach capabilities, and the AP, A/THR and FD engagement status.',
        '',
        'Please visit our [documentation](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/pfd/fma/) website to learn more about FMAs.',
    ]),
    image: { url: FMA_IMAGE_URL },
});

export const fma: MessageCommandDefinition = {
    name: 'fma',
    description: 'Provides a link to the FMA docs guide',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: fmaEmbed,
};
