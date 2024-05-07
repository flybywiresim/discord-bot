import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const SCREENSHOT_HELP_URL = `${imageBaseUrl}/support/screenshot.jpg`;

const screenshotEmbed = makeEmbed({
    title: 'FlyByWire Support | Aircraft State',
    description: makeLines([
        'In order to provide efficient support, we need to see the state of your aircraft and its systems.',
        '',
        'Please position yourself in the cockpit using the arrow keys to look straight at the front instrument panel. Then use the [Windows Snipping Tool](https://support.microsoft.com/en-us/windows/open-snipping-tool-and-take-a-screenshot-a35ac9ff-4a58-24c9-3253-f12bac9f9d44) to take a clear screenshot of **all screens and the entire FCU** as shown below.',
        '',
        'Read the guide [here](https://docs.flybywiresim.com/fbw-a32nx/support/#screenshot-of-cockpit) for more information.',
    ]),
    image: { url: SCREENSHOT_HELP_URL },
});

export const screenshot: MessageCommandDefinition = {
    name: ['screenshot', 'cockpit', 'ss'],
    description: 'Help to screenshot for support',
    category: CommandCategory.SUPPORT,
    genericEmbed: screenshotEmbed,
};
