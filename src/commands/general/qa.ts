import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const qaEmbed = makeEmbed({
    title: 'FlyByWire | Quality Assurance',
    description: 'Any additions/changes to the code in our aircraft are tested thoroughly by our Quality Assurance Team. The team is composed of members of our community; if you\'re interested in finding out more information on our QA process, or joining the team, please read our guide [here!](https://docs.flybywiresim.com/dev-corner/qa-process/)',
});

export const qa: MessageCommandDefinition = {
    name: 'qa',
    description: 'Links to the Quality Assurance docs page',
    category: CommandCategory.GENERAL,
    genericEmbed: qaEmbed,
};
