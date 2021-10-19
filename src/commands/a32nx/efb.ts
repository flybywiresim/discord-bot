import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const EFB_URL = 'https://cdn.discordapp.com/attachments/885885609007276062/895429612119683082/EFB2.gif';

export const efb: CommandDefinition = {
    name: 'efb',
    description: 'Inquire about the state of the EFB',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: EFB_URL } })),
};
