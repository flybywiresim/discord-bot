import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const github: CommandDefinition = {
    name: ['github', 'repo', 'repository'],
    description: 'provides the link to the A32NX GitHub Repository',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const githubEmbed = makeEmbed({
            title: 'FlyByWire A32NX | GitHub Repository',
            description: makeLines([
                'Below is the link to our A32NX GitHub Repository',
                '',
                '[A32NX GitHub Repository](https://github.com/flybywiresim/a32nx)',
            ]),
        });

        await msg.channel.send({ embeds: [githubEmbed] });

    },
};
