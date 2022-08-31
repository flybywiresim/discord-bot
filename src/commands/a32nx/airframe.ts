import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const airframe: CommandDefinition = {
    name: ['airframe'],
    description: 'Provides a link to the updated Simbrief airframe',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const airframeEmbed = makeEmbed({
            title: 'FlyByWire A32NX | SimBrief Airframe',
            description: 'Our updated SimBrief airframe for the A32NX with correct weights is available [here](https://docs.flybywiresim.com/fbw-a32nx/installation/#simbrief-airframe). This is a new airframe based on our updated flight model, and will always be kept up-to-date.',
        });

        await msg.channel.send({ embeds: [airframeEmbed] });
    },
};
