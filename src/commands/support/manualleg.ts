import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const MANUAL_URL = 'https://cdn.discordapp.com/attachments/752801628347957248/929071827752480839/mcdu-discontinuity-manual-conceptual.png';
const DISCON_DOCS_URL = 'https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-planning/disco/?h=manual#discontinuities-after-manual-leg'

export const manualleg: CommandDefinition = {
    name: ['manualleg', 'vm'],
    description: 'Displays image and links to docs about manual waypoints',
    category: CommandCategory.SUPPORT,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire Support | Manual Leg',
        image: { url: MANUAL_URL },
        description : makeLines ([
            `Please see our [documentation](${DISCON_DOCS_URL}) for information on how to deal with a manual leg in your flight plan.`
        ]),
    })),
};
