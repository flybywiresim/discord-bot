import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const simbriefimport: CommandDefinition = {
    name: ['import', 'integration', 'integ'],
    description: 'Shows how to use SimBrief integration',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | simBrief import',
        description: makeLines([
            'The A32NX has SimBrief integration. This means you can create a flight plan in simBrief and import it into the FMS. Please refer to our [documentation](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preflight/#flight-plan-import) for instructions.',
        ]),
    })),
};
