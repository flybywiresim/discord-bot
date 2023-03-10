import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const cleanEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Clean Install',
    description: makeLines([
        'We suggest trying a clean install. Please see [this guide](https://docs.flybywiresim.com/fbw-a32nx/installation/#clean-install-steps) for detailed instructions.',
    ]),
});

export const clean: MessageCommandDefinition = {
    name: ['clean', 'clean install', 'cleaninstall', 'order66'],
    description: 'Clean Install',
    category: CommandCategory.SUPPORT,
    genericEmbed: cleanEmbed,
};
