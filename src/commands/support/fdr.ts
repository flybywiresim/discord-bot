import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const fdrEmbed = makeEmbed({
    title: 'FlyByWire Support | Flight Data Recorder',
    description: makeLines([
        'Please send us your FDR (flight data recorder) files for further investigation.',
        '',
        'In your work folder, you will find the FDR files for the flight you did. You should recognize the correct one by the filename, which is the date of the flight. For a long flight, it might have been split into several files.',
        '',
        'Compress/Zip the files and upload them to a sharing site (e.g. [Swisstransfer.com](https://www.swisstransfer.com/)) as these files are likely to be too large for Discord.',
        '',
        'Detailed instructions on how to locate your FDR files can be found [here.](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/autopilot-fbw/#work-folder-location)',
        '',
        'This file will allow us to see more details about your flight to understand what happened.',
    ]),
});

export const fdr: MessageCommandDefinition = {
    name: 'fdr',
    description: 'Information on how to provide fdr files',
    category: CommandCategory.SUPPORT,
    genericEmbed: fdrEmbed,
};
