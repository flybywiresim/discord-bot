import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const tillerEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Tiller',
    description: 'You are now able to control the nose steering of the A32NX using a separate tiller axis. You can read more about this in our guide [here.](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/nw-tiller/)',
});

export const tiller: MessageCommandDefinition = {
    name: ['tiller', 'steer', 'steering', 'til', 'nws'],
    description: 'Provides a link to the tiller feature guide',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: tillerEmbed,
};
