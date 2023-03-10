import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const afloorEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Alpha Floor',
    description: 'Please see our [Alpha Floor Protection Guide](https://docs.flybywiresim.com/pilots-corner/advanced-guides/protections/afloor/) or [Video Tool-Tip](https://youtu.be/iXQb675J9mA) for information on Alpha Floor Protection and how to prevent/recover from it.',
});

export const afloor: MessageCommandDefinition = {
    name: 'afloor',
    description: 'Provides a link to the Alpha Floor Tool-Tip',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: afloorEmbed,
};
