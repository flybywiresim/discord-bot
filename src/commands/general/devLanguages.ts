import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const devLanguagesEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Development Languages',
    description: makeLines([
        'The A32NX is built using a number of development languages for different aspects of the aircraft. The below list confirms the current languages used, however is not exhaustive.',
        '',
        '**General:** React',
        '**flyPad:** Tailwind CSS, Redux',
        '**Autopilot/Flight controls:** MATLAB/C++',
        '**Systems/Physics simulations:** Rust',
        '**Displays/Avionics:** TypeScript, React (deprecated), MSFS Avionics Framework',
    ]),
});

export const devLanguages: MessageCommandDefinition = {
    name: ['devlanguage', 'devlanguages', 'devlang', 'dl'],
    description: 'Provides a list of development languages used in the A32NX.',
    category: CommandCategory.GENERAL,
    genericEmbed: devLanguagesEmbed,
};
