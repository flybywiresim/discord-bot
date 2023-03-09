import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const verticalSpeedPriorityEmbed = makeEmbed({
    title: 'FlyByWire A32NX | V/S & FPA Priority',
    description: makeLines([
        'The V/S (FPA) guidance has priority over the speed guidance. If the selected target V/S or FPA is too high (relative to the current thrust condition and speed), the FMGC will steer the aircraft to the target V/S or FPA, but the aircraft will also accelerate or decelerate.',
        '',
        'When the speed reaches its authorized limit, V/S or FPA automatically decreases to maintain the minimum or maximum speed limit.',
        '',
        'Please check the [Vertical Speed and Flight Path Angle documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/vertical-guidance/selected-modes/#vs-and-fpa-vertical-speed-and-flight-path-angle) for more details.',
    ]),
});

export const verticalSpeedPriority: MessageCommandDefinition = {
    name: ['verticalspeedpriority', 'vspriority', 'fpapriority', 'vspeed'],
    description: 'Explain the priority of Vertical Speed or Flight Path Angle over Speed guidance.',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: verticalSpeedPriorityEmbed,
};
