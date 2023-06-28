import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const experimentalEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Experimental Version',
    description: makeLines([
        'Our Experimental version is temporarily on hold and is not being updated. All of its features have been moved to the Development Version. ',
        '',
        'The function of the Experimental version is to test high-impact features which aren\'t ready for the wider public yet. As there are currently no such features being tested and it being easier to introduce new features into the Development version and maintain it, it was decided to put the Experimental version on hold.',
    ]),
});

export const experimental: MessageCommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: experimentalEmbed,
};
