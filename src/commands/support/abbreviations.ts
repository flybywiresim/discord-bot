import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const abbreviationsEmbed = makeEmbed({
    title: 'FlyByWire Support | Abbreviations',
    description: makeLines([
        'Aviation is full of terms & abbreviations!',
        'Here\'s a list you can reference:',
        '',
        '[Terms and Abbreviations](https://docs.flybywiresim.com/pilots-corner/abbreviations/)',
    ]),
});

export const abbreviations: MessageCommandDefinition = {
    name: ['abbreviations', 'abb', 'abrv'],
    description: 'Links to most commonly used abbreviations',
    category: CommandCategory.SUPPORT,
    genericEmbed: abbreviationsEmbed,
};
