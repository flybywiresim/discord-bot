import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const remoteEfbEmbed = makeEmbed({
    title: 'FlyByWire Support | Remote EFB',
    description: makeLines([
        'Currently the EFB cannot be viewed remotely, but it is a planned feature.',
        '',
        'In the meantime, you can however use an application like [Spacedesk](https://www.spacedesk.net/)* to create a virtual screen using your tablet/phone/pc, and then de-attach the EFB from MSFS by holding the ALTGR button and clicking on the EFB with your mouse. You can then drag the EFB window to your virtual screen. Please note that this solution will degrade your performance slightly, as your computer needs to render and process the new virtual screen.',
    ]),
    footer: { text: '*Spacedesk is not associated with FlyByWire Simulations in any way. We only suggest this solution as it has been proven to work in the past.' },
});

export const remoteEfb: MessageCommandDefinition = {
    name: ['remoteefb', 'refb', 'remoteflypad', 'rflypad'],
    category: CommandCategory.SUPPORT,
    genericEmbed: remoteEfbEmbed,
};
