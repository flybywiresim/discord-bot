import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';


export const tug: CommandDefinition = {
    name: ['tug', 'stuck'],
    description: 'Help to screenshot for support',
    category: CommandCategory.SUPPORT,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire Support | How to fix aircraft being stuck',
        description: makeLines([
            'Make sure you do not have the "NW STRG DISC" ECAM Message. '
           + 'If you do, please press shift+p on your keyboard to disconnect the invisible pushback tug.',
             'Please read the guide [here](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/#nose-wheel-steering-locked-nw-strg-disc) for more information. ',
        ]),
        
    })),
};