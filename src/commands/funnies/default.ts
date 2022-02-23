import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const DEFAULT_URL = 'https://c.tenor.com/QWjhCWftI2YAAAAC/airplane-fly.gif';

export const defaultmeme: CommandDefinition = {
    name: 'default',
    description: 'O_o',
    category: CommandCategory.FUNNIES,
    executor: async (msg) => {
        const defaultEmbed = makeEmbed({ image: { url: DEFAULT_URL } });
        await msg.channel.send({ embeds: [defaultEmbed] });
    },
};
