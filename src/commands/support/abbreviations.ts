import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const abbreviations: CommandDefinition = {
    name: ['abbreviations', 'abb', 'abrv'],
    description: 'Links to most commonly used abbreviations',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const abbreviationsEmbed = makeEmbed({
            title: 'FlyByWire Support | Abbreviations',
            description: makeLines([
                'Aviation is full of terms & abbreviations!',
                'Here\'s a list you can reference:',
                '',
                '[Terms and Abbreviations](https://docs.flybywiresim.com/pilots-corner/abbreviations/)',
            ]),
        });

        await msg.channel.send({ embeds: [abbreviationsEmbed] });
    },
};
