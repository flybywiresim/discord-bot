import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const discontinuity: CommandDefinition = {
    name: ['discontinuity', 'disco'],
    description: 'Link to docs about discontinuities',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const discontinuityEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Discontinuity',
            description: makeLines ([
                'Please see our [documentation](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preparing-mcdu/#discontinuity) for information on what to do with a discontinuity in your flight plan.',
            ]),
        });

        await msg.channel.send({ embeds: [discontinuityEmbed] });

    },
};
