import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const installerEmbed = makeEmbed({
    title: 'Installer',
    description: 'Download the A32NX Installer where you can select either the Stable or Developer Version, and download and install the addon directly into your Community Folder, [download here](https://api.flybywiresim.com/installer)',
    footer: { text: 'If you are having further problems, let us know in our Support Channel and we will provide more assistance.' },
});

export const installer: MessageCommandDefinition = {
    name: 'installer',
    description: 'Provides link to the installer',
    category: CommandCategory.GENERAL,
    genericEmbed: installerEmbed,
};
