import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const mcdu: CommandDefinition = {
    name: ['remotemcdu', 'mcdu', 'remote'],
    description: 'Provides a link to the FlyByWire remote MCDU feature guide',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const mcduEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Remote MCDU',
            description: 'Please see our [guide](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/web-mcdu/) on how to use the FlyByWire A32NX remote MCDU feature.',
        });

        await msg.channel.send({ embeds: [mcduEmbed] });

    },
};
