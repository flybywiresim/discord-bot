import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const MANAGED_SELECTED_IMAGE = 'https://cdn.discordapp.com/attachments/1234165731319353436/1258331400709472256/New_Project_1.png?ex=6687a7f0&is=66865670&hm=462f8a417207e18117703c42295da293497dc2895f88f30d068c07f216ea5259&';

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
