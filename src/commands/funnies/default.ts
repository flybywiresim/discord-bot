import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const DEFAULT_URL = 'https://tenor.com/view/airplane-fly-travel-happy-excited-gif-5686712';

export const defaultmeme: CommandDefinition = {
    name: 'default',
    description: 'O_o',
    category: CommandCategory.FUNNIES,
    executor: (msg) => {
        const defaultEmbed = makeEmbed({ image: { url: DEFAULT_URL } });
        return msg.channel.send({ embeds: [defaultEmbed] });
    },
};
