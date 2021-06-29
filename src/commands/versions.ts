import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const versions: CommandDefinition = {
    name: 'versions',
    description: 'Explains the different A32NX versions',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Versions',
        footer: { text: 'If you are having further problems, let us know in our #support channel and we will provide more assistance.' },
        fields: [
            {
                name: 'Stable',
                value: '> Stable is our variant that has the least bugs and best performance. '
                        + 'It will not always be up to date but we guarantee it\'s compatibility with each major patch from MSFS.'
                        + '\n> Use the installer or [download here](https://api.flybywiresim.com/api/v1/download?url=https://flybywiresim-packages.b-cdn.net/stable/A32NX-stable.zip)',
                inline: false,
            },
            {
                name: 'Development',
                value: '> Development will have the latest features that will end up in the next stable. '
                        + 'Bugs are to be expected. It updates whenever something is added to the \'master\' branch on Github.'
                        + '\n> Use the installer or [download here](https://api.flybywiresim.com/api/v1/download?url=https://flybywiresim-packages.b-cdn.net/vmaster/A32NX-master.zip)',
                inline: false,
            },
            {
                name: 'Experimental (On Hold)',
                value: '> The experimental branch is currently on hold until further notice. '
                        + 'We will notify you through our #server-announcements when we have integrated the custom FPM and LNAV and make the experimental version available again. '
                        + 'Until then please use the development version. '
                        + '\n> Use the installer to download the latest Development version. [Installer Download](https://api.flybywiresim.com/installer)',
                inline: false,
            },
        ],
    })),
};
