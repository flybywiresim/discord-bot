import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const takeoffPerfEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Takeoff Performance Calculator',
    description: makeLines([
        'A Takeoff Performance Calculator is available on the **Developer** version of the A32NX. For more information, check out the [Takeoff Performance Calculator documentation](https://docs.flybywiresim.com/flypad-performance/).',
        '',
        'For the **Stable** version, see the [V-Speeds Section](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preparing-mcdu/#v-speeds) in our MCDU guide.',
        '',
        '**Note:** The functionality where the LSK next to the V1, VR and V2 speeds can be used to automatically calculate them in the MCDU PERF page has been removed in the Developer version. Use the new Takeoff Performance Calculator instead.',
    ]),
});

export const takeoffPerf: MessageCommandDefinition = {
    name: ['takeoff', 'calculator', 'perf'],
    description: 'Provides an explanation as to why there is no takeoff calculator for V-speeds or FLEX.',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: takeoffPerfEmbed,
};
