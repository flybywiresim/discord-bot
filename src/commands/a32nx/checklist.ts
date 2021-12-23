import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const CHECKLIST_IMAGE_URL = 'https://cdn.discordapp.com/attachments/909840276770680832/920038887840157746/Checklist.png';

export const checklist: CommandDefinition = {
    name: 'checklist',
    description: 'Displays the checklist',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Checklist',
        url: 'https://github.com/flybywiresim/manuals/raw/master/pdf/A32NX%20Documentation/FBW%20A32NX%20Checklist.pdf',
        description: makeLines([
            'Click the title to download as a PDF',
        ]),
        image: { url: CHECKLIST_IMAGE_URL },
    })),
};
