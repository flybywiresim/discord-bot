import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const remoteMcdu: CommandDefinition = {
    name: 'remotemcdu',
    description: 'Provides a link to the FlyByWire remote MCDU feature guide',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const remoteMcduEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Remote MCDU',
            description: 'Please see our [guide](https://docs.flybywiresim.com/simbridge/simbridge-feature-guides/remote-displays/remote-mcdu/) on how to use the FlyByWire A32NX remote MCDU feature.',
        });

        return msg.channel.send({ embeds: [remoteMcduEmbed] });
    },
};
