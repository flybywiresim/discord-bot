import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const NUT_URL = 'https://cdn.discordapp.com/attachments/874018873433808946/900139765154873414/meme.png';

export const nut: CommandDefinition = {
    name: 'nut',
    category: CommandCategory.FUNNIES,
    description: 'nut',
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: NUT_URL } })),
};
