import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const CHECKLIST_IMAGE_URL = `${imageBaseUrl}/a32nx/A32NX_checklist.png`;

const checklistEmbed = makeEmbed({
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
    genericEmbed: checklistEmbed,
};
