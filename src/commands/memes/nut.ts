import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const NUT_URLS = [
    `${imageBaseUrl}/memes/nut.png`,
    `${imageBaseUrl}/memes/nut-2.jpg`,
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
    return items[0];
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
