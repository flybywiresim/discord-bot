import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const flexTemp: CommandDefinition = {
    name: ['flextemp', 'flex'],
    description: 'Provides a link to the a32nx flex temp guide',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const flexEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Flex Temp',
            description: 'A320neo takeoff performance data is not readily available. To set your Flex Temp in the simulator please see the [Flex Temp Section](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preparing-mcdu/#flex-temp) in our MCDU guide.
        });

        await msg.channel.send({ embeds: [flexEmbed] });

    },
};
