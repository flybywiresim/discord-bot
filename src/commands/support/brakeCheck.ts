import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const BRAKECHECK_HELP_URL = `${imageBaseUrl}/support/brakecheck.png`;

const brakeCheckEmbed = makeEmbed({
    title: 'FlyByWire Support | Checking brake inputs',
    description: makeLines([
        'To find out if your hardware is doing any brake inputs:',
        '',
        '1. Load a flight in the A32NX',
        '2. Go to General Settings in MSFS and activate Developer Mode.',
        '3. Go to the \'Tools\' menu and select \'Behaviors\'.',
        '4. Select \'LocalVariables\' and search for \'BRAKE_PEDAL\'.',
        '',
        'This displays the current brake input values. Please send a screenshot of those values, so that we can continue providing support to you.',
    ]),
    image: { url: BRAKECHECK_HELP_URL },
    footer: { text: 'Tip: Click the image to view in full size' },
});

export const brakeCheck: MessageCommandDefinition = {
    name: ['brakecheck', 'brake'],
    description: 'Provides instructions to check brake inputs',
    category: CommandCategory.SUPPORT,
    genericEmbed: brakeCheckEmbed,
};
