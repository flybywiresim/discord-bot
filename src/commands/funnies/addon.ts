import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADDON_URL = 'https://cdn.discordapp.com/attachments/811229810193465344/904049458973646909/meme.png';

export const addon: CommandDefinition = {
    name: 'addon',
    category: CommandCategory.FUNNIES,
    description: 'addon not mod meme',
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: ADDON_URL } })),
};
