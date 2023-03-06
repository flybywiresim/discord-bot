import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const airacEmbed = makeEmbed({
    title: 'FlyByWire Support | SimBrief AIRACs',
    description: makeLines([
        'Free SimBrief accounts are limited to generating routes using obsolete AIRAC cycles, while MSFS regularly updates to the latest AIRAC available. This can lead to route incompatibilies and various error messages when you import to the MCDU, including "NOT ALLOWED", "NOT IN DATABASE", and "AWY/WPT MISMATCH".',
        '',
        'Any of these errors during route import could mean that your route is no longer valid in the current cycle, and cannot be properly used alongside our SimBrief import feature!',
        '',
        'Some alternative route generators are available, that can be used with manual route input:',
        '',
        '[RouteFinder](http://rfinder.asalink.net/free/)',
        '[Flight Plan Database](https://flightplandatabase.com/)',
        '[Online Flight Planner](http://onlineflightplanner.org/)',
    ]),
});

export const airac: MessageCommandDefinition = {
    name: 'airac',
    description: 'Provides information about free SimBrief account AIRAC limitations',
    category: CommandCategory.SUPPORT,
    genericEmbed: airacEmbed,
};
