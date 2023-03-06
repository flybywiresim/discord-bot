import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ROADMAP_URL = `${process.env.IMAGE_BASE_URL}general/roadmap.png`;

export const roadmap: CommandDefinition = {
    name: ['roadmap', 'goals'],
    category: CommandCategory.GENERAL,
    description: 'FBW Roadmap',
    executor: (msg) => {
        const roadmapEmbed = makeEmbed({ image: { url: ROADMAP_URL } });

        return msg.channel.send({ embeds: [roadmapEmbed] });
    },
};
