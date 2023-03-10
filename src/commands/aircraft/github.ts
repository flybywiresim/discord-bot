import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const githubEmbed = makeEmbed({
    title: 'FlyByWire A32NX | GitHub Repository',
    description: makeLines([
        'Here is the link to our [A32NX GitHub Repository](https://github.com/flybywiresim/a32nx)',
    ]),
});

export const github: MessageCommandDefinition = {
    name: ['github', 'repo', 'repository'],
    description: 'provides the link to the A32NX GitHub Repository',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: githubEmbed,
};
