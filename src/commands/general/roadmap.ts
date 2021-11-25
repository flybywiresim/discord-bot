import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ROADMAP_URL = 'https://cdn.discordapp.com/attachments/740722295009706034/893674991667798026/ROADMAP.png';

export const roadmap: CommandDefinition = {
    name: ['roadmap', 'goals'],
    category: CommandCategory.GENERAL,
    description: 'FBW Roadmap',
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: ROADMAP_URL } })),
};
