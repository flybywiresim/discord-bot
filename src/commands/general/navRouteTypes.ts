import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const navRoutesURL = `${imageBaseUrl}/general/navroutes.png`;

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
