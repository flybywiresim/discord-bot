import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SCREENSHOT_HELP_URL = 'https://docs.flybywiresim.com/fbw-a32nx/assets/support-guide/cockpit-screenshot.jpg';

export const screenshot: CommandDefinition = {
    name: ['screenshot', 'cockpit', 'ss'],
    description: 'Help to screenshot for support',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const screenshotEmbed = makeEmbed({
            title: 'FlyByWire Support | How to take a good screenshot',
            description: makeLines([
                'Position yourself in the cockpit using the arrow keys to look straight at the front instrument panel. Then use the Windows Snipping Tool to take a clear screenshot of all screens and the FCU as shown.',
                'Please read the guide [here](https://docs.flybywiresim.com/fbw-a32nx/support/#screenshot-of-cockpit) for more information.',
            ]),
            image: { url: SCREENSHOT_HELP_URL },
        });

        await msg.channel.send({ embeds: [screenshotEmbed] });
    },
};
