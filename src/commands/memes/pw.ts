import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const PW_URL = 'https://cdn.discordapp.com/attachments/748761999747579944/961760315949867129/PW.png';

export const pw: CommandDefinition = {
    name: 'pw',
    description: 'Whale noises',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const pwEmbed = makeEmbed({ image: { url: PW_URL } });
        await msg.channel.send({ embeds: [pwEmbed] });
    },
};
