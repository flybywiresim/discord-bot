import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const takeoffPerfEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Where is the takeoff calculator?',
    description: 'A takeoff calculator for the A32NX is currently under development.',
});

export const takeoffPerf: MessageCommandDefinition = {
    name: ['takeoff', 'calculator', 'perf'],
    description: 'Provides an explanation as to why there is no takeoff calculator for V-speeds or FLEX.',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: takeoffPerfEmbed,
};
