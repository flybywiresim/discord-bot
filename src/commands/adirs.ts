import { CommandDefinition } from '../lib/command';
import { makeEmbed, makeLines } from '../lib/embed';
import { CommandCategory } from '../constants';

const ADIRS_IMAGE_URL = 'https://media.discordapp.net/attachments/785976111875751956/818095298538504272/image0.png';

export const adirs: CommandDefinition = {
    name: ['ADIRS', 'adirs'],
    description: 'Display help with ADIRS alignment',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | ADIRS align',
        description: makeLines([
            'On the overhead panel you will see the three switches under 'ADIRS'. Turn these three to the 'NAV' position and wait around 7 minutes for your ADIRS to align.',
            'You can check how long you have to wait by looking at the align time on your Upper Ecam.',
        ]),
        image: { url: ADIRS_IMAGE_URL },
    })),
};