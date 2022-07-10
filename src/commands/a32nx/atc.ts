import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const atc: CommandDefinition = {
    name: 'atc',
    category: CommandCategory.A32NX,
    description: 'Provides a link to the cFMS special notes section.',
    executor: async (msg) => {
        const atcEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Default ATC',
            description: makeLines([
                'To use the default ATC and/or world map flight plan import, you need to enable the **Sync MSFS Flight Plan** setting in the EFB Sim Options.',
                '',
                'Please read cFMS special notes [here.](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/cFMS/#special-notes)',
            ]),
        });

        await msg.channel.send({ embeds: [atcEmbed] });
    },
};
