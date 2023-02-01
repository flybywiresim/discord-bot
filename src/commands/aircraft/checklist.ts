import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const CHECKLIST_IMAGE_URL = 'https://cdn.discordapp.com/attachments/898602626436964402/923602202495418458/FBW_A32NX_Checklist_3-1.png';

const genericChecklistEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Checklist',
    url: 'https://github.com/flybywiresim/manuals/raw/master/pdf/A32NX%20Documentation/FBW%20A32NX%20Checklist.pdf',
    description: makeLines([
        'Click the title to download as a PDF',
    ]),
    image: { url: CHECKLIST_IMAGE_URL },
});

export const checklist: MessageCommandDefinition = {
    name: 'checklist',
    description: 'Displays the checklist',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: genericChecklistEmbed,
};
