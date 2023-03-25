import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const COMFOLDER_HELP_URL = `${imageBaseUrl}/support/community.png`;

const communityEmbed = makeEmbed({
    title: 'FlyByWire Support | Identifying your Community folder',
    description: makeLines([
        'To find the Community folder that MSFS is using please follow these steps:',
        '',
        '1. Go to General Settings in MSFS and activate Developer Mode.',
        '2. Go to the menu and select \'Virtual File System\'.',
        '3. Click on \'Packages Folders\' and select \'Open Community Folder\'.',
        '',
        'This opens the Community folder in a Windows Explorer. Please ensure that your addons are installed in the folder that is opened. ',
    ]),
    image: { url: COMFOLDER_HELP_URL },
    footer: { text: 'Tip: Click the image to view in full size' },
});

export const community: MessageCommandDefinition = {
    name: ['community', 'com'],
    description: 'Help to identify community folder for support',
    category: CommandCategory.SUPPORT,
    genericEmbed: communityEmbed,
};
