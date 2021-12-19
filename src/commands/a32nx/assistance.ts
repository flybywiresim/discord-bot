import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const assistance: CommandDefinition = {
    name: ['assistance', 'assi', 'as'],
    description: 'Explains to the user why assistance options should be disabled',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Assistance Options',
        description: makeLines([
            'The A32NX is not compatible with the Microsoft Flight Simulator assistance feature "Auto-Rudder".** It is required to deactivate this feature in MSFS.**',
            '',
            'We recommend to turn off all assistance features in MSFS as they interfere with the A32NX systems.'
        ]),
        image: { url: 'https://docs.flybywiresim.com/fbw-a32nx/assets/nw-tiller/assistance-options.png' },
    })),
};
