import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const FLYPAD_ABOUT_URL = `${imageBaseUrl}/support/flypad-settings-about.png`;

const flyPadAboutEmbed = makeEmbed({
    title: 'FlyByWire Support | Checking your flyPadOS and aircraft version',
    description: makeLines([
        'In order to rule out version conflicts and continue with providing support for our aircraft, we need to see a screenshot showing your flyPadOS and aircraft version. The version of the flyPadOS and aircraft can be found in the following way:',
        '',
        'After loading the aircraft, use the flyPad (EFB) to open the Settings - About page and provide a screenshot of the flyPad. For more details on the flyPadOS, check our [documentation](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flypados3/settings/#about).',
    ]),
    image: { url: FLYPAD_ABOUT_URL },
});

export const flyPadAbout: MessageCommandDefinition = {
    name: ['flypadabout', 'efbabout', 'flypadversion', 'efbversion'],
    description: 'Help to identify the version of the FlyByWire flyPadOS and aircraft for support',
    category: CommandCategory.SUPPORT,
    genericEmbed: flyPadAboutEmbed,
};
