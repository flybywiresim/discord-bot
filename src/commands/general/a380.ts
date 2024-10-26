import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const a380Embed = makeEmbed({
    title: 'When is the A380X releasing?',
    description: 'The A380X is releasing on the 31st of October, 2024.',
});

export const a380: MessageCommandDefinition = {
    name: 'a380',
    description: "The A380X's release date",
    category: CommandCategory.GENERAL,
    genericEmbed: a380Embed,
};
