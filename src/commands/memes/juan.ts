import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const JAUN_URL = 'https://cdn.discordapp.com/attachments/740722295009706034/775255132949577748/maxresdefault.png';

export const juan: CommandDefinition = {
    name: 'juan',
    description: 'just... Jaun',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const juanEmbed = makeEmbed({ image: { url: JAUN_URL } });
        await msg.channel.send({ embeds: [juanEmbed] });
    },
};
