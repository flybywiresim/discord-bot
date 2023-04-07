import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { Channels, CommandCategory } from '../../constants';

const supportGuideEmbed = makeEmbed({
    title: 'FlyByWire Support | Support Guide',
    description: makeLines([
        'To be able to give you the best support for your problem, please follow these steps:',
        '',
        '- Take one or more screenshots while you experience the problem. You can use the `.ss` bot command to see an example of a good screenshot.',
        '- Be sure you know how to fly the A32NX by reading our [beginners guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/overview/).',
        '- Check our [reported issues list](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/) to see if your issue has a known solution.',
        '- Verify the issue is reproducible with only the A32NX in the community folder and no external programs affecting MSFS are running. For example: GSX, SPAD.neXt, ...',
        `- Clearly document the steps to reproduce the issue and provide them together with the screenshots in the <#${Channels.A32NX_SUPPORT}> channel.`,
        '',
        'View our documentation for the full [support guide](https://docs.flybywiresim.com/fbw-a32nx/support/) and more information on how to fly the FlyByWire A32NX.',
    ]),
});

export const supportGuide: MessageCommandDefinition = {
    name: ['supportguide', 'sg'],
    description: 'Help to identify needed to be able to give support',
    category: CommandCategory.SUPPORT,
    genericEmbed: supportGuideEmbed,
};
