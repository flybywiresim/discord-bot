import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const donateEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Donations',
    description: 'Please see our [open collective](https://opencollective.com/flybywire) to donate and view a breakdown of expenses covered by donations.',
});

export const donate: MessageCommandDefinition = {
    name: 'donate',
    description: 'Provides a link to the open collective',
    category: CommandCategory.GENERAL,
    genericEmbed: donateEmbed,
};
