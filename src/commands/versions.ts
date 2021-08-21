import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const versions: CommandDefinition = {
    name: 'versions',
    description: 'Explains the different A32NX versions',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Versions',
        footer: { text: 'If you are having further problems, let us know in our #support channel. [More version info here](https://docs.flybywiresim.com/start/fbw-versions)' },
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
                name: 'Experimental',
                value: '> This version is similar to the development version, but contains custom systems still being developed, including the new FBW Custom Flight Management System (cFMS). '
                        + 'Experimental version will be updated with the latest changes to the "custom-fpm" branch and development version regularly. '
                        + '\n> No support will be offered via Discord for this version. '
                        + '\n> Use the installer or [download here](https://api.flybywiresim.com/api/v1/download?url=https://flybywiresim-packages.b-cdn.net/experimental/A32NX-experimental.zip)',
                inline: false,
            },
        ],
    })),
};
