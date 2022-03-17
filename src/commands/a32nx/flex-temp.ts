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
            description: 'Please see our [guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preparing-mcdu/#flex-temp) on flex temp for information on how to set it correctly.',
        });

        await msg.channel.send({ embeds: [flexEmbed] });

    },
};
