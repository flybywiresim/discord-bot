import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const MANAGED_SELECTED_IMAGE = `${imageBaseUrl}/support/apmodes.png`;

export const apModesEmbed = makeEmbed({
    title: 'Auto Pilot Modes',
    description: 'For a detailed explanation of the different guidance modes visit our [documentation](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/overview/#autopilot-and-flight-director-modes).',
    image: { url: MANAGED_SELECTED_IMAGE },
    footer: { text: 'Tip: Click the image to view in full size' },
});

export const apmodes: MessageCommandDefinition = {
    name: ['apmodes', 'APmodes'],
    description: 'Provides information about the Managed and Selected autopilot modes.',
    category: CommandCategory.SUPPORT,
    genericEmbed: apModesEmbed,
};
