import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const POV_URL = 'https://cdn.discordapp.com/attachments/897491699167793182/998837092538925057/pov50-30rl.gif';

export const pov: CommandDefinition = {
    name: 'pov',
    description: 'Oof',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const povEmbed = makeEmbed({ image: { url: POV_URL } });
        await msg.channel.send({ embeds: [povEmbed] });
    },
};
