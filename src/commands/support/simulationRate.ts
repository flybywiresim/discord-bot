import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const simrateEmbed = makeEmbed({
    title: 'FlyByWire Support | Simulation Rate',
    description: makeLines([
        'The Simulation Rate is limited by the FlyByWire A32NX to protect and guarantee the Autopilot is able to work reliably. The Autopilot needs the equivalent of about 17 or more frames per second (FPS) in a real time simulation. This is needed for the Autopilot to be able to do enough calculations for each real time second.',
        '',
        'The required FPS for a specific simulation rate can be calculated using `<sim rate> * 17`. Another way of calculating the simulation rate your system can support is by using `<FPS at sim rate 1> / 17`.',
        '',
        'Example:',
        '1) If your FPS at simulation rate 1 is 60, you can support a simulation rate up to 3.5 (`60/17=3.5`). At simulation rate 2, the Autopilot would be able to use 30 FPS for its calculations (`60/2=30`). At simulation rate 3, it would be able to use 20 FPS (`60/3=20`)',
        '',
        '2) If you would like to enable a simulation rate of 4, you need at least 68 FPS (`4*17=68`), so that the Autopilot still has 17 FPS available for its calculations for each real time second.',
    ]),
});

export const simulationRate: MessageCommandDefinition = {
    name: ['simulationrate', 'simrate'],
    description: 'Describe how the simulation rate of is limited for optimal use of the FlyByWire A32NX Autopilot',
    category: CommandCategory.SUPPORT,
    genericEmbed: simrateEmbed,
};
