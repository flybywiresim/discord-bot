import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const flexEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Flex Temp',
    description: makeLines([
        'The Flex Temp can be calculated in the **Development** version using the Takeoff Performance Calculator in the EFB. Check out the [Documentation](https://docs.flybywiresim.com/flypad-performance/) for more information.',
        '',
        'For the **Stable** version, see the [Flex Temp Section](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preparing-mcdu/#flex-temp) in our MCDU guide.',
    ]),
});

export const flexTemp: MessageCommandDefinition = {
    name: ['flextemp', 'flex'],
    description: 'Provides a link to the a32nx flex temp guide',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: flexEmbed,
};
