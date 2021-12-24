import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const ctd: CommandDefinition = {
    name: ['ctd', 'crash'],
    description: 'Crash to Desktop',
    category: CommandCategory.SUPPORT,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire Support | Crash To Desktop',
        description: 'Find a collection of tips around Crash To Desktops [here.](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/#ctd-crash-to-desktop)',
    })),
};
