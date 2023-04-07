import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const ASSISTANCE_IMAGE_URL = `${imageBaseUrl}/a32nx/assistance-options.png`;

const assistanceEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Assistance Options',
    description: makeLines([
        'The A32NX is not compatible with the Microsoft Flight Simulator assistance feature "Auto-Rudder". **It is required to deactivate this feature in MSFS.**',
        '',
        'We recommend turning off all assistance features in MSFS as they interfere with the A32NX systems.',
    ]),
    image: { url: ASSISTANCE_IMAGE_URL },
});

export const assistance: MessageCommandDefinition = {
    name: ['assistance', 'assi', 'as'],
    description: 'Explains to the user why assistance options should be disabled',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: assistanceEmbed,
};
