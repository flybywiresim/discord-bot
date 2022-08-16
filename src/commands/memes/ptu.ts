import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const PTU_URL = 'https://cdn.discordapp.com/attachments/898602626436964402/902346330146471996/302164c.jpg';

export const ptu: CommandDefinition = {
    name: 'ptu',
    description: 'Bark',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const ptuEmbed = makeEmbed({ image: { url: PTU_URL } });
        return msg.channel.send({ embeds: [ptuEmbed] });
    },
};
