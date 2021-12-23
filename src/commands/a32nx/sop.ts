import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SOP_IMAGE_URL = 'https://cdn.discordapp.com/attachments/864493190471352344/920758283533422632/SOP.png';

export const sop: CommandDefinition = {
    name: 'sop',
    description: 'Displays first page of SOP and provides PDF download',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | SOP',
        url: 'https://github.com/flybywiresim/manuals/raw/master/pdf/A32NX%20Documentation/FBW%20A32NX%20SOP.pdf',
        description: makeLines([
            'Click the title to download as a PDF',
        ]),
        image: { url: SOP_IMAGE_URL },
    })),
};
