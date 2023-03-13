import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const MANUAL_LEG_IMAGE_URL = `${imageBaseUrl}/support/manualleg.png`;
const DISCON_DOCS_URL = 'https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-planning/disco/';

const genericManualLegEmbed = makeEmbed({
    title: 'FlyByWire Support | Manual Leg',
    image: { url: MANUAL_LEG_IMAGE_URL },
    description: `Please see our [documentation](${DISCON_DOCS_URL}) for information on how to deal with a manual leg in your flight plan.`,
});

export const manualleg: MessageCommandDefinition = {
    name: ['manualleg', 'manual'],
    description: 'Displays image and links to docs about manual waypoints',
    category: CommandCategory.SUPPORT,
    genericEmbed: genericManualLegEmbed,
};
