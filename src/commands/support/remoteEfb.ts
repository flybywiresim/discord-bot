import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const remoteEfbEmbed = makeEmbed({
    title: 'FlyByWire Support | Remote EFB',
    description: makeLines([
        'Currently the EFB cannot be viewed remotely, but it is a planned feature.',
        '',
        'In the meantime, you can however use an application like [spacedesk](https://www.spacedesk.net/)* to create a virtual screen using your tablet/phone/pc, and then detach the EFB from MSFS by holding the `ALTGR` button and clicking on the EFB with your mouse. You can then drag the EFB window to your virtual screen.',
        '',
        'If you want to use touch inputs with the efb on your virtual screen, you need to use a program like [MSFS Pop Out Panel Manager](https://flightsim.to/file/35759/msfs-pop-out-panel-manager) as MSFS doesn\'t directly support this via spacedesk.',
        '',
        'Please note that this solution will degrade your performance slightly, as your computer needs to render and process the new virtual screen.',

    ]),
    footer: { text: '*Neither spacedesk nor MSFS Popout panal manager is associated with FlyByWire Simulations in any way. We only suggest this solution as it has been proven to work in the past.' },
});

export const remoteEfb: MessageCommandDefinition = {
    name: ['remoteefb', 'refb', 'remoteflypad', 'rflypad'],
    category: CommandCategory.SUPPORT,
    genericEmbed: remoteEfbEmbed,
};
