import { CommandDefinition } from '../lib/command';
import { makeEmbed } from '../lib/embed';
import { CommandCategory } from '../constants';

const EFB_URL = 'https://cdn.discordapp.com/attachments/741669372195504200/806287507855638618/ezgif.com-video-to-gif-4.gif';

export const efb: CommandDefinition = {
    name: 'efb',
    description: 'Inquire about the state of the EFB',
    category: CommandCategory.FBW,
    executor: (msg) => {
        msg.channel.send(makeEmbed({ image: { url: EFB_URL } }));
    },
};
