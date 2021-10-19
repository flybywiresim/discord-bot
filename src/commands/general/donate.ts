import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const donate: CommandDefinition = {
    name: ['Donate', 'donate'],
    description: 'Provides a link to the open collective',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Donations',
        description: 'Please see our [open collective](https://opencollective.com/flybywire) to donate and view a breakdown of expenses covered by donations.',
    })),
};