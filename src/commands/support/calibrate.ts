import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const calibrateEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Throttle Calibration',
    description: makeLines([
        'You need to calibrate your throttles!',
        '',
        'Please read our [Throttle Calibration Guide](https://docs.flybywiresim.com/throttle)',
    ]),
});

export const calibrate: MessageCommandDefinition = {
    name: 'calibrate',
    description: 'Provides a help for throttle calibration',
    category: CommandCategory.SUPPORT,
    genericEmbed: calibrateEmbed,
};
