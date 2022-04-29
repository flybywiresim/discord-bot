import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ROADMAP_URL = 'https://cdn.discordapp.com/attachments/827579133964845107/909827187354533978/ROADMAP.png';

export const roadmap: CommandDefinition = {
    name: ['roadmap', 'goals'],
    category: CommandCategory.GENERAL,
    description: 'FBW Roadmap',
    executor: async (msg) => {
        const roadmapEmbed = makeEmbed({ image: { url: ROADMAP_URL } });

        await msg.channel.send({ embeds: [roadmapEmbed] });
    },
};
