import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const CHECKLIST_IMAGE_URL = `${process.env.IMAGE_BASE_URL}a32nx/A32NX_checklist.png`;

export const checklist: CommandDefinition = {
    name: 'checklist',
    description: 'Displays the checklist',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const checklistEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Checklist',
            url: 'https://github.com/flybywiresim/manuals/raw/master/pdf/A32NX%20Documentation/FBW%20A32NX%20Checklist.pdf',
            description: makeLines([
                'Click the title to download as a PDF',
            ]),
            image: { url: CHECKLIST_IMAGE_URL },
        });

        return msg.channel.send({ embeds: [checklistEmbed] });
    },
};
