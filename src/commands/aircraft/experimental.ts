import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const experimentalEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Experimental Version',
    description: makeLines([
        'The experimental version is being discontiued and doesn\'t get updated anymore. To get the newest features and bugfixes we recomment do switch to the development version.',
        '',
        'The experimental version existed for long time tests of high impact features. As there are currently no such features being tested and it being easier to introduce new features in the development version and maintain it, it was decided to discontinue the experimental version.',
        'In the installer the experimental version might still show up, but will eventually be removed.',
    ]),
});

export const experimental: MessageCommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: experimentalEmbed,
};
