import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const airframeEmbed = makeEmbed({
    title: 'FlyByWire | simBrief Airframes',
    description: 'Updated simBrief airframes exist for our different available aircraft. Please use the below reactions to select the correct airframe.',
});

const a32nxAirframeEmbed = makeEmbed({
    title: 'FlyByWire A32NX | simBrief Airframe',
    description: 'Our updated simBrief airframe for the A32NX with correct weights is available [here](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/simbrief/#simbrief-airframe). This is a new airframe based on our updated flight model, and will always be kept up-to-date.',
});

const a380xAirframeEmbed = makeEmbed({
    title: 'FlyByWire A380X | simBrief Airframe',
    description: 'The updated simBrief airframe for the A380X is not yet available.',
});

export const airframe: MessageCommandDefinition = {
    name: ['airframe'],
    description: 'Provides a link to the updated simBrief airframe',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: airframeEmbed,
    typeEmbeds: {
        a32nx: a32nxAirframeEmbed,
        a380x: a380xAirframeEmbed,
    },
};
