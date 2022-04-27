import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const preflight: CommandDefinition = {
    name: 'preflight',
    description: 'Provides a link to the a32nx preflight guide',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const preflightEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Preflight',
            description: 'Please see our [guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preflight/) for a quick reference guide on things you should do before departing in the A32NX.',
        });

        await msg.channel.send({ embeds: [preflightEmbed] });
    },
};
