import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const CHECKLIST_IMAGE_URL = 'https://media.discordapp.net/attachments/898602626436964402/923602202495418458/FBW_A32NX_Checklist_3-1.png';

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
