import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const navRoutesURL = 'https://media.discordapp.net/attachments/838062729398976522/1051934378269364244/38c571b663cd3204e89707b223a5b7de.png';

const genericNavRouteTypesEmbed = makeEmbed({
    title: 'FlyByWire | Navigation Route Types',
    image: { url: navRoutesURL },
});

export const navRouteTypes: MessageCommandDefinition = {
    name: ['navroutetypes', 'navroutes', 'rnp-rnav', 'rnp'],
    category: CommandCategory.GENERAL,
    description: 'Provides an overview of different types of Navigation Routes.',
    genericEmbed: genericNavRouteTypesEmbed,
};
