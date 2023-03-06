import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const MARKETPLACE_HELP_URL = `${process.env.IMAGE_BASE_URL}support/market.png`;

export const market: CommandDefinition = {
    name: ['market', 'marketremove', 'removemarket', 'rm', 'mr'],
    description: 'Help with removing the marketplace version',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const contentEmbed = makeEmbed({
            title: 'FlyByWire Support | Removing Marketplace Version',
            description: makeLines([
                'To remove the marketplace version of the A32NX, please open the MSFS Content Manager from the second page on the main menu and search for \'flybywire\'. Then uninstall the 0.6.1 version.',
                '',
                'Never use the Content Manager to update A32NX, use the [installer](https://api.flybywiresim.com/installer) to keep it up to date.',
            ]),
            image: { url: MARKETPLACE_HELP_URL },
        });

        return msg.channel.send({ embeds: [contentEmbed] });
    },
};
