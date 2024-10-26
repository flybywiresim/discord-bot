import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const whenEmbed = makeEmbed({
    title: 'When is it coming?',
    description: 'The FBW A380X will be released on the 31st of October, 2024! If you are looking to fly the A32NX, download it via the FBW installer.',
});

export const when: MessageCommandDefinition = {
    name: 'when',
    description: 'Explain the absence of release dates or ETAs',
    category: CommandCategory.GENERAL,
    genericEmbed: whenEmbed,
};
