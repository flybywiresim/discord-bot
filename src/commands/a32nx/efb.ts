import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const EFB_URL = 'https://cdn.discordapp.com/attachments/752801628347957248/914937996514570300/FBWanim2_1.gif';

export const efb: CommandDefinition = {
    name: 'efb',
    description: 'Inquire about the state of the EFB',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: EFB_URL } })),
};
