import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const whenEmbed = makeEmbed({
    title: 'When is it coming?',
    description: 'Due to the community-driven nature of our projects, we do not enforce delivery timelines on our volunteer developers. We value high-quality, polished releases over frequent and quickly-released ones, which means some features might take time to land in a publicly-available build. Rest assured that our developers and contributors are working hard on making every FlyByWire project as bug-free and feature-complete as possible, but that we are not able to provide release dates or estimates for a certain feature/fix.',
});

export const when: MessageCommandDefinition = {
    name: 'when',
    description: 'Explain the absence of release dates or ETAs',
    category: CommandCategory.GENERAL,
    genericEmbed: whenEmbed,
};
