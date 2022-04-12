import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const airac: CommandDefinition = {
    name: 'airac',
    description: 'Provides information about free SimBrief account AIRAC limitations',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const airacEmbed = makeEmbed({
            title: 'FlyByWire Support | SimBrief AIRACs',
            description: makeLines ([
                'Free SimBrief accounts are limited to generating routes valid for AIRAC 2003, while MSFS currently uses AIRAC 2203. '
                + 'This can lead to route incompatibilies and various error messages on the MCDU, including "NOT ALLOWED", "NOT IN DATABASE", and "AWY/WPT MISMATCH". ',
                '',
                'Any of these errors mean your route is not valid for the current AIRAC, and is unusable for SimBrief import!',
                '',
                'Some alternative route generators are available:',
                '',
                '[RouteFinder](http://rfinder.asalink.net/free/)',
                '[Flight Plan Database](https://flightplandatabase.com/)',
                '[Online Flight Planner](http://onlineflightplanner.org/)',
            ]),
        });

        await msg.channel.send({ embeds: [airacEmbed] });

    },
};
