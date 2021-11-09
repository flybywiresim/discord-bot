import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const NUT_URL = 'https://cdn.discordapp.com/attachments/740722295009706034/907005439579914340/meme.png';

export const whened: CommandDefinition = {
    name: 'whened',
    category: CommandCategory.FUNNIES,
    description: '.when meme',
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: NUT_URL } })),
};
