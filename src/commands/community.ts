import { CommandDefinition } from '../lib/command';
import { makeEmbed, makeLines } from '../lib/embed';
import { CommandCategory } from '../constants';

const COMFOLDER_HELP_URL = 'https://docs.flybywiresim.com/fbw-a32nx/assets/find-community-folder.png';

export const community: CommandDefinition = {
    name: ['community', 'com'],
    description: 'Help to identify community folder for support',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire Support | Identifying your Community folder',
        description: makeLines([
            'To find the Community folder that MSFS is using please follow these steps:',
            ,
            '1. Go to General Settings in MSFS and activate \'Developer Mode\'.',
            '2. Go to the menu and open the Virtual File System.',
            '3. Click on Packages Folders and select "Open Community Folder".',
            ,
            'This opens the Community folder in a Windows Explorer.',
        ]),
        image: { url: COMFOLDER_HELP_URL },
        footer: { text: 'Tip: Click the image to view in full size' }
    })),
};
