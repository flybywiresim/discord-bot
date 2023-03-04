import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADIRS_IMAGE_URL = 'https://cdn.discordapp.com/attachments/838062729398976522/894173641682616381/unknown.png';

const adirsEmbed = makeEmbed({
    title: 'FlyByWire A32NX | ADIRS align',
    description: makeLines([
        'On the overhead panel you will see the three switches under \'ADIRS\'. Turn these three to the \'NAV\' position. It takes several minutes for the ADIRUs to align.',
        'You can check how long you have to wait by looking at the align time on your Upper Ecam.',
    ]),
    image: { url: ADIRS_IMAGE_URL },
});

export const adirs: MessageCommandDefinition = {
    name: 'adirs',
    description: 'Display help with ADIRS alignment',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: adirsEmbed,
};
