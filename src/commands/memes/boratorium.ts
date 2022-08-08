import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const BORATORIUM_URL = 'https://cdn.discordapp.com/attachments/747571948342476850/803668297844260874/hqdefault.png';

export const boratorium: CommandDefinition = {
    name: 'boratorium',
    description: 'B O R A T',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const boratoriumEmbed = makeEmbed({ image: { url: BORATORIUM_URL } });
        await msg.channel.send({ embeds: [boratoriumEmbed] });
    },
};
