import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const calibrate: CommandDefinition = {
    name: 'calibrate',
    description: 'Provides a help for throttle calibration',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Throttle Calibration',
        description: 'You need to calibrate your throttles\n'
                + '\n'
                + '1. Make sure you have a linear throttle axis. This can be achieved by setting Sensitivity + and -, centre and deadzone to 0.\n'
                + '2. If you are using your throttles as reversers (without toggling with a button), make sure to enable reverse on axis, otherwise, leave this off.\n'
                + '3. Watch [this video](https://www.youtube.com/watch?v=8yZuv2L4jPA&ab_channel=FlyByWireSimulations) in full, then calibrate your throttles.\n'
                + '4. If you still have issues you may need to make your detent ranges larger. This can be done on the calibration page and making the range value higher. 0.05 is a good starting point.',
    })),
};