import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const CHECKLIST_URL = 'https://cdn.discordapp.com/attachments/909840276770680832/917052865669918720/T9DYayu0hlwAAAABJRU5ErkJggg.png';

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
        image: { url: CHECKLIST_URL },
    })),
};
