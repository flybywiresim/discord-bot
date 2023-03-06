import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADIRS_IMAGE_URL = `${process.env.IMAGE_BASE_URL}a32nx/adirs.png`;

export const adirs: CommandDefinition = {
    name: 'adirs',
    description: 'Display help with ADIRS alignment',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const adirsEmbed = makeEmbed({
            title: 'FlyByWire A32NX | ADIRS align',
            description: makeLines([
                'On the overhead panel you will see the three switches under \'ADIRS\'. Turn these three to the \'NAV\' position. It takes several minutes for the ADIRUs to align.',
                'You can check how long you have to wait by looking at the align time on your Upper Ecam.',
            ]),
            image: { url: ADIRS_IMAGE_URL },
        });

        return msg.channel.send({ embeds: [adirsEmbed] });
    },
};
