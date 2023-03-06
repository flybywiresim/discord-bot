import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const NAVIGRAPH_NAVDATA_URL = `${process.env.IMAGE_BASE_URL}support/navdata.png`;

export const navigraphNavdata: CommandDefinition = {
    name: ['navigraphdata', 'navigraphnavdata'],
    description: 'Provides help with Navigraph navdata reinstall',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const navigraphNavdataEmbed = makeEmbed({
            title: 'FlyByWire Support | Navigraph Navdata',
            description: makeLines([
                'Please remove, and reinstall your Navigraph Navdata with the Navigraph tool.',
            ]),
            image: { url: NAVIGRAPH_NAVDATA_URL },
        });

        return msg.channel.send({ embeds: [navigraphNavdataEmbed] });
    },
};
