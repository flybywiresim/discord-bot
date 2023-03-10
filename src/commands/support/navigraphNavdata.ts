import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const NAVIGRAPH_NAVDATA_URL = 'https://cdn.discordapp.com/attachments/785976111875751956/912394143844696154/unknown.png';

const navigraphNavdataEmbed = makeEmbed({
    title: 'FlyByWire Support | Navigraph Navdata',
    description: makeLines([
        'Please remove, and reinstall your Navigraph Navdata with the Navigraph tool.',
    ]),
    image: { url: NAVIGRAPH_NAVDATA_URL },
});

export const navigraphNavdata: MessageCommandDefinition = {
    name: ['navigraphdata', 'navigraphnavdata'],
    description: 'Provides help with Navigraph navdata reinstall',
    category: CommandCategory.SUPPORT,
    genericEmbed: navigraphNavdataEmbed,
};
