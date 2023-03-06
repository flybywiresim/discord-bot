import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SOP_IMAGE_URL = `${process.env.IMAGE_BASE_URL}a32nx/sop.png`;

export const sop: CommandDefinition = {
    name: 'sop',
    description: 'Displays first page of SOP and provides PDF download',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const sopEmbed = makeEmbed({
            title: 'FlyByWire A32NX | SOP',
            url: 'https://github.com/flybywiresim/manuals/raw/master/pdf/A32NX%20Documentation/FBW%20A32NX%20SOP.pdf',
            description: makeLines([
                'Click the title to download as a PDF',
            ]),
            image: { url: SOP_IMAGE_URL },
        });

        return msg.channel.send({ embeds: [sopEmbed] });
    },
};
