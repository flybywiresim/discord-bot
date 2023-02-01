import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const genericAssistanceEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Assistance Options',
    description: makeLines([
        'The A32NX is not compatible with the Microsoft Flight Simulator assistance feature "Auto-Rudder". **It is required to deactivate this feature in MSFS.**',
        '',
        'We recommend turning off all assistance features in MSFS as they interfere with the A32NX systems.',
    ]),
    image: { url: 'https://docs.flybywiresim.com/fbw-a32nx/assets/settings/assistance-options.png' },
});

export const assistance: MessageCommandDefinition = {
    name: ['assistance', 'assi', 'as'],
    description: 'Explains to the user why assistance options should be disabled',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: genericAssistanceEmbed,
};
