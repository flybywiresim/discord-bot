import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const BRUHEG_URL = 'https://media.discordapp.net/attachments/772990923486527534/790331925398945852/xbGbh5H8sxGwAAAABJRU5ErkJggg.png';

export const bruheg: CommandDefinition = {
    name: 'bruheg',
    description: 'bruheg momen',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const bruhegEmbed = makeEmbed({ image: { url: BRUHEG_URL } });
        return msg.channel.send({ embeds: [bruhegEmbed] });
    },
};
