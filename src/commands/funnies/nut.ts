import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const NUT_URL = 'https://media.discordapp.net/attachments/838062729398976522/879523609926832198/meme.png';

export const nut: CommandDefinition = {
    name: 'nut',
    category: CommandCategory.FUNNIES,
    description: 'nut',
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: NUT_URL } })),
};
