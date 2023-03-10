import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const ctrlEEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Engine Start',
    description: makeLines([
        'The FlyByWire A32NX is not compatible with the CTRL+E method of starting your engines.',
        '',
        'Please see our [beginners guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/engine-start-taxi/) for detailed information on how to configure and start the aircraft.',
    ]),
});

export const ctrlE: MessageCommandDefinition = {
    name: ['ctrle', 'ctrl+e', 'ctrl-e', 'enginestart'],
    description: 'Displays help regarding CTRL+E engine start',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: ctrlEEmbed,
};
