import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const GOLDEN_RULES_IMAGE_URL = `${process.env.IMAGE_BASE_URL}general/goldenrules.png`;

const goldenRulesEmbed = makeEmbed({
    title: 'FlyByWire | Golden Rules',
    image: { url: GOLDEN_RULES_IMAGE_URL },
});

export const goldenRules: MessageCommandDefinition = {
    name: ['goldenrules', 'golden', 'gr'],
    description: 'Provides an image describing the golden rules an Airbus pilot should follow',
    category: CommandCategory.GENERAL,
    genericEmbed: goldenRulesEmbed,
};
