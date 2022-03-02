import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const NAVDATA_URL = 'https://cdn.discordapp.com/attachments/785976111875751956/912394143844696154/unknown.png';

export const navdata: CommandDefinition = {
    name: 'navdata',
    description: 'Provides help with Navigraph navdata reinstall',
    category: CommandCategory.SUPPORT,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire Support | Navigraph Navdata',
        description: makeLines ([
            'Please remove, and reinstall your navdata with the Navigraph tool.',
        ]),
        image: { url: NAVDATA_URL },
    })),
};