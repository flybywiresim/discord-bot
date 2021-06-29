import { CommandDefinition } from '../lib/command';
import { makeEmbed } from '../lib/embed';
import { CommandCategory } from '../constants';

const BRUHEG_URL = 'https://media.discordapp.net/attachments/772990923486527534/790331925398945852/xbGbh5H8sxGwAAAABJRU5ErkJggg.png';

export const bruheg: CommandDefinition = {
    name: 'bruheg',
    description: 'bruheg momen',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: BRUHEG_URL } })),
};
