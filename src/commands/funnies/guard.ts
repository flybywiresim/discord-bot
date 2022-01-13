import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const GUARD_URL = 'https://tenor.com/view/cat-meow-big-lips-gif-13233291';

export const guard: CommandDefinition = {
    name: 'guard',
    description: 'MEOW',
    category: CommandCategory.FUNNIES,
    executor: async (msg) => {
        const guardEmbed = makeEmbed({ image: { url: GUARD_URL } });
        await msg.channel.send({ embeds: [guardEmbed] });
    },
};
