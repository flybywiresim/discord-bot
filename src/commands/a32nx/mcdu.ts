import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const mcdu: CommandDefinition = {
    name: ['mcdu', 'mcdudoc'],
    description: 'Provides a link to the MCDU documentation',
    category: CommandCategory.A32NX,
    executor: (msg) => {
        const mcduEmbed = makeEmbed({
            title: 'FlyByWire A32NX | MCDU Documentation',
            description: makeLines([
                'Please see our [MCDU documentation](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/) for information on the MCDU of the FlyByWire A32NX.',
                '',
                'If you\'d like to immediately go to a specific chapter please use the list below:',
                '- [Overview](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/)',
                '- [MCDU Interface](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/interface/)',
                '- [DIR TO page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/dir/)',
                '- [PROG page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/prog/)',
                '- [PERF page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/perf/)',
                '- [INIT page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/init/)',
                '- [DATA page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/data/)',
                '- [F-PLN page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/f-pln/)',
                '- [RAD NAV page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/rad-nav/)',
                '- [FUEL PRED page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/fuel-pred/)',
                '- [SEC F-PLN page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/sec-f-plan/)',
                '- [ATC COMM page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/atc-comm/)',
                '- [MCDU MENU page](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/mcdu-menu/)',
                '- [MCDU Messages](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/messages/)',
            ]),
        });

        return msg.channel.send({ embeds: [mcduEmbed] });
    },
};
