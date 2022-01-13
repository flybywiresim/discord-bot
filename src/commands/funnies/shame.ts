import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const SHAME_URL = 'https://tenor.com/view/the-simpsons-homer-simpson-homer-good-bye-im-done-gif-3610339';

export const shame: CommandDefinition = {
    name: 'shame',
    description: 'Shame, shame, shame',
    category: CommandCategory.FUNNIES,
    executor: async (msg) => {
        const shameEmbed = makeEmbed({ image: { url: SHAME_URL } });
        await msg.channel.send({ embeds: [shameEmbed] });
    },
};
