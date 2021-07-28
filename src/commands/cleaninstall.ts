import { CommandDefinition } from '../lib/command';
import { makeEmbed, makeLines } from '../lib/embed';
import { CommandCategory } from '../constants';

export const cleaninstall: CommandDefinition = {
    name: ['clean', 'cleaninstall', 'install'],
    description: 'Display help with ADIRS alignment',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Clean Install',
        description: makeLines([
            'To perform a clean install you have to:',
            '',
            '`#1` Delete the `flybywire-aircraft-a320-neo` folder from your community folder.',
            '`#2` Re-install through the [\`installer\`](https://www.flybywiresim.com)'
        ])
    })),
};
