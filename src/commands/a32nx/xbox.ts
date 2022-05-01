import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const xbox: CommandDefinition = {
    name: ['xbox', 'xboxmarketplace'],
    description: 'Short response + link to NOTAM for xbox marketplace',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const xboxEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Xbox + MSFS Marketplace',
            description: 'Due to a number of contributing factors, the A32NX will not be released on the Xbox or the Marketplace. [You can read more here](https://flybywiresim.com/notams/marketplace-announcement/).',
        });

        await msg.channel.send({ embeds: [xboxEmbed] });
    },
};
