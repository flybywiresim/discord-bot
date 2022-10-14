import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const NUT_URLS = [
    'https://media.discordapp.net/attachments/838062729398976522/879523609926832198/meme.png',
    'https://media.discordapp.net/attachments/902918266958282762/1030222802839666738/6wtds8.jpg',
];
const NUT_URL_WEIGHTS = [0.2, 0.8];

const weightedRandom = (items, weights) => {
    const cumulativeWeights = [];
    for (let i = 0; i < weights.length; i += 1) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        if (cumulativeWeights[itemIndex] >= randomNumber) {
            return items[itemIndex];
        }
    }
};

export const nut: CommandDefinition = {
    name: 'nut',
    description: 'nut',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const nutEmbed = makeEmbed({ image: { url: weightedRandom(NUT_URLS, NUT_URL_WEIGHTS) } });
        return msg.channel.send({ embeds: [nutEmbed] });
    },
};
