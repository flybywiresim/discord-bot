import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const ctd: CommandDefinition = {
    name: ['ctd', 'crash'],
    description: 'Crash to Desktop',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const ctdEmbed = makeEmbed({
            title: 'FlyByWire Support | Crash To Desktop',
            description: 'Find a collection of tips to help with crash to desktops [here.](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/#ctd-crash-to-desktop)',
        });

        await msg.channel.send({ embeds: [ctdEmbed] });

    },
};
