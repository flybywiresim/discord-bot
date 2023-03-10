import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const reportedissuesEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: 'Please see [this link](https://docs.flybywiresim.com/reported-issues/) for a current list of reported issues.',
});

export const reportedissues: MessageCommandDefinition = {
    name: ['reportedissues', 'issues'],
    description: 'Provides a link to the reported issues page within docs',
    category: CommandCategory.SUPPORT,
    genericEmbed: reportedissuesEmbed,
};
