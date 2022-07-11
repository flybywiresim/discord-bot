import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const MARKETPLACE_HELP_URL = 'https://cdn.discordapp.com/attachments/897491699167793182/995841973900541962/marketplace.png';

export const market: CommandDefinition = {
    name: 'market',
    description: 'Help with removing the marketplace version',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const contentEmbed = makeEmbed({
            title: 'FlyByWire Support | Removing Marketplace Version',
            description: makeLines([
                'To remove the marketplace version of the A32NX, please open the MSFS Content Manager from the second page on the main menu and search for \'flybywire\'. Then uninstall the 0.6.1 version.',
                '',
                'Never use the Content Manager to update A32NX, use the [installer](https://api.flybywiresim.com/installer) to keep it up to date.',
            ]),
            image: { url: MARKETPLACE_HELP_URL },
        });

        await msg.channel.send({ embeds: [contentEmbed] });
    },
};
