import { CommandDefinition } from '../lib/command';
import { makeEmbed } from '../lib/embed';

const BORATORIUM_URL = 'https://cdn.discordapp.com/attachments/747571948342476850/803668297844260874/hqdefault.png';

export const boratorium: CommandDefinition = {
    name: 'boratorium',
    executor: (msg) => {
        msg.channel.send(makeEmbed({ image: { url: BORATORIUM_URL } }));
    },
};
