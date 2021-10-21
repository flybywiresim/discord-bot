import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ADIRS_IMAGE_URL = 'https://cdn.discordapp.com/attachments/838062729398976522/894173641682616381/unknown.png';

export const ctrl_e: CommandDefinition = {
    name: ['ctrle', 'ctrl+e', 'enginestart'],
    description: 'Displays help regarding CTRL+E engine start',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Engine Start',
        description: makeLines([
            'The FlyByWire A32NX is not compatible with the CTRL+E method of starting your engines.',
            ,
            'Please see our [beginners guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/engine-start-taxi/) for detailed information on how to configure and start the aircraft.',
        ]),
    })),
};