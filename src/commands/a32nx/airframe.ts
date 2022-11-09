import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const genericAirframeEmbed = makeEmbed({
    title: 'FlyByWire | SimBrief Airframes',
    description: 'Updated Simbrief airframes exists for our different available aircraft. Please use the below reactions to select the correct airframe.',
});

const a32nxAirframeEmbed = makeEmbed({
    title: 'FlyByWire A32NX | SimBrief Airframe',
    description: 'Our updated SimBrief airframe for the A32NX with correct weights is available [here](https://docs.flybywiresim.com/fbw-a32nx/installation/#simbrief-airframe). This is a new airframe based on our updated flight model, and will always be kept up-to-date.',
});

export const airframe: MessageCommandDefinition = {
    name: ['airframe'],
    description: 'Provides a link to the updated Simbrief airframe',
    category: CommandCategory.A32NX,
    genericEmbed: genericAirframeEmbed,
    typeEmbeds: { a32nx: a32nxAirframeEmbed },
};
