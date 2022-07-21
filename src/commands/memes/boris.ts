import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const BORIS_URL = 'https://c.tenor.com/1bIsb5roaSsAAAAd/haggisbandit-sound.gif';

export const boris: CommandDefinition = {
    name: 'boris',
    description: 'boris soudn',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const borisEmbed = makeEmbed({ image: { url: BORIS_URL } });
        await msg.channel.send({ embeds: [borisEmbed] });
    },
};
