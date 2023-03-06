import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ROADMAP_URL = 'https://cdn.discordapp.com/attachments/827579133964845107/909827187354533978/ROADMAP.png';

const roadmapEmbed = makeEmbed({ image: { url: ROADMAP_URL } });

export const roadmap: MessageCommandDefinition = {
    name: ['roadmap', 'goals'],
    category: CommandCategory.GENERAL,
    description: 'FBW Roadmap',
    genericEmbed: roadmapEmbed,
};
