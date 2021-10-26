import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const BRUHEG_URL = 'https://cdn.discordapp.com/attachments/874018873433808946/902283096752291920/unknown.png';

export const bruheg: CommandDefinition = {
    name: 'bruheg',
    description: 'bruheg momen',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: BRUHEG_URL } })),
};
