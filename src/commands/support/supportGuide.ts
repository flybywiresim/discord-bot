import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const supportGuideEmbed = makeEmbed({
    title: 'FlyByWire Support | Support Guide',
    description: makeLines([
        'To be able to give support please for your problem, follow this guide:',
        '',
        '- grab a screenshot while you experience the problem',
        '- be sure you know how to fly the a32nx -> visit the [beginners guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/overview/)',
        '- check if you can find it in our [reported issues list](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/)',
        '- make sure it is reproducible',
        '- try to reproduce it with only the a32nx in the community folder and no external programs like gsx, SPAD.neXt, etc. running',
        '- ask in #a32nx-support with the screenshot you made and provide as much detail as possible',
        '',
        'View our documentation for the full [support guide](https://docs.flybywiresim.com/fbw-a32nx/support/) and more information on how to fly the FlyByWire a32nx',
    ]),
});

export const supportGuide: MessageCommandDefinition = {
    name: ['supportguide', 'sg'],
    description: 'Help to identify needed to be able to give support',
    category: CommandCategory.SUPPORT,
    genericEmbed: supportGuideEmbed,
};
