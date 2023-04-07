import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const ROADMAP_URL = `${imageBaseUrl}/general/roadmap.png`;

const roadmapEmbed = makeEmbed({ image: { url: ROADMAP_URL } });

export const roadmap: MessageCommandDefinition = {
    name: ['roadmap', 'goals'],
    category: CommandCategory.GENERAL,
    description: 'FBW Roadmap',
    genericEmbed: roadmapEmbed,
};
