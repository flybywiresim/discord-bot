import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const briefingEmbed = makeEmbed({
    title: 'FlyByWire A32NX | A320neo Pilot Briefing',
    description: 'Please see our [A320neo Pilot Briefing](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/) for an interactive overview of the flight deck and systems. (This is work in progress and we will add more chapters over time).',
});

export const briefing: MessageCommandDefinition = {
    name: ['briefing', 'flightdeck', 'pfd'],
    description: 'Provides a link to the A320neo Pilot Briefing',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: briefingEmbed,
};
