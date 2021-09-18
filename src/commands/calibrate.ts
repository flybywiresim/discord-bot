import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed, makeLines } from '../lib/embed';

export const calibrate: CommandDefinition = {
    name: 'calibrate',
    description: 'Provides a help for throttle calibration',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Throttle Calibration',
        description: makeLines ([
                'You need to calibrate your throttles!',
                '',
                'Please read our [Throttle Calibration Guide](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flyPad/throttle-calibration/)',
        ]),
    })),
};
