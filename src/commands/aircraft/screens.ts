import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const SCREENS_HELP_URL = `${imageBaseUrl}/a32nx/screens.png`;

const screensEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Screens Fix',
    description: makeLines([
        'Turn the following knobs to illuminate the dark screens.',
        '(Make sure to have batteries and Ground Power ON)',
    ]),
    image: { url: SCREENS_HELP_URL },
});

export const screens: MessageCommandDefinition = {
    name: ['screens', 'screen'],
    description: 'Display help with avionics',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: screensEmbed,
};
