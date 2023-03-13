import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const NAVIGRAPH_NAVDATA_URL = `${imageBaseUrl}/support/navdata.png`;

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
