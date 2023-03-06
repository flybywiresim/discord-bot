import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const GOLDEN_RULES_IMAGE_URL = `${process.env.IMAGE_BASE_URL}general/goldenrules.png`;
export const goldenRules: CommandDefinition = {
    name: ['goldenrules', 'golden', 'gr'],
    description: 'Provides an image describing the golden rules an Airbus pilot should follow',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const goldenRulesEmbed = makeEmbed({
            title: 'FlyByWire | Golden Rules',
            image: { url: GOLDEN_RULES_IMAGE_URL },
        });

        return msg.channel.send({ embeds: [goldenRulesEmbed] });
    },
};
