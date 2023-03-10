import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const discontinuityEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Discontinuity',
    description: makeLines([
        'Please see our [documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-planning/disco/) for information on what to do with a discontinuity in your flight plan.',
    ]),
});

export const discontinuity: MessageCommandDefinition = {
    name: ['discontinuity', 'disco'],
    description: 'Link to docs about discontinuities',
    category: CommandCategory.SUPPORT,
    genericEmbed: discontinuityEmbed,
};
