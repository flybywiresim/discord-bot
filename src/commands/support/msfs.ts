import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const msfs: CommandDefinition = {
    name: ['msfs', 'msfsforum'],
    description: 'Provides links to MSFS support for sim issues',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const msfsEmbed = makeEmbed({
            title: 'MSFS | Sim issues',
            description: 'This is the FlyByWire Discord server, and we\'re only able to help with issues with our aircraft. For any core Microsoft Flight Simulator related issues please ask on [Microsoft Flight Simulator\'s Discord](https://discord.gg/msfs) or in the official [Microsoft Flight Simulator Forum](https://forums.flightsimulator.com/c/community/140).',
        });

        return msg.channel.send({ embeds: [msfsEmbed] });
    },
};
