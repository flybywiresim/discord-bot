import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const github: CommandDefinition = {
    name: 'github',
    description: 'provides the link to the a32nx github page',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const githubEmbed = makeEmbed({
            title: 'FlyByWire A32NX | github page',
            description: makeLines ([
                'Below is the link to our a32nx github page',
                '',
                '[a32nx github page](https://github.com/flybywiresim/a32nx)',
            ]),
        });

        await msg.channel.send({ embeds: [githubEmbed] });

    },
};