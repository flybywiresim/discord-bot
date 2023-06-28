import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const versionsEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Versions',
    footer: { text: 'If you are having further problems, let us know in our #support channel.' },
    fields: [
        {
            name: 'Stable or Development?',
            value: '> You can find a brief explanation of the versions below, for a more in depth comparison, [please click here.](https://docs.flybywiresim.com/fbw-a32nx/fbw-versions) ',
            inline: false,
        },
        {
            name: 'Stable',
            value: makeLines([
                '> Stable is our version which has features that are the most mature and most tested. This should be a reliable version for those preferring stability over newest features. Will be compatible with each major MSFS patch.',
                '',
                '> Use the [installer](https://api.flybywiresim.com/installer) or [download here](https://github.com/flybywiresim/a32nx/releases/download/assets/stable/A32NX-stable.zip)',
            ]),
            inline: false,
        },
        {
            name: 'Development',
            value: makeLines([
                '> Development will have the latest features that will eventually end up in the next stable release. In general this version has the latest fixes and newest features but also a slightly higher risk of containing bugs. Development updates whenever a change is made to the "master" branch on Github.',
                '',
                '> Use the [installer](https://api.flybywiresim.com/installer) or [download here](https://github.com/flybywiresim/a32nx/releases/download/assets/master/A32NX-master.zip)',
            ]),
            inline: false,
        },
        {
            name: 'Experimental',
            value: makeLines([
                '> Experimental is currently on hold and is not being updated. We recommend using the Stable or Development version.',
            ]),
            inline: false,
        },
    ],
});

export const versions: MessageCommandDefinition = {
    name: 'versions',
    description: 'Explains the different A32NX versions',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: versionsEmbed,
};
