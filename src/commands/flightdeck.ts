import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const flightdeck: CommandDefinition = {
    name: 'flightdeck',
    description: 'Links to the clickable flight deck',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Interactive Flight Deck',
        description: 'Please click [here](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/flight-deck/) for a clickable version of the A32NX flight deck, where you can click each panel to get further information on the panel.',
    })),
};
