import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const beginnerEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Beginner\'s Guide',
    description: makeLines([
        'Please see our [beginner\'s guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/overview/) for information on how to set up and fly the A32NX. It contains detailed information for both new sim pilots and veterans looking for a refresher on certain topics.',
        '',
        'If you\'d like to immediately go to a specific chapter please use the list below:',
        '- [Preflight](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preflight/)',
        '- [Starting the Aircraft](https://docs.flybywiresim.com/pilots-corner/beginner-guide/starting-the-aircraft/)',
        '- [Preparing the MCDU](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preparing-mcdu/)',
        '- [Engine Start and Taxi](https://docs.flybywiresim.com/pilots-corner/beginner-guide/engine-start-taxi/)',
        '- [Takeoff, Climb and Cruise](https://docs.flybywiresim.com/pilots-corner/beginner-guide/takeoff-climb-cruise/)',
        '- [Descent Planning and Descent](https://docs.flybywiresim.com/pilots-corner/beginner-guide/descent/)',
        '- [Approach and ILS Landing](https://docs.flybywiresim.com/pilots-corner/beginner-guide/landing/)',
        '- [After Landing and Taxi to Gate](https://docs.flybywiresim.com/pilots-corner/beginner-guide/after-landing/)',
        '- [Powering Down](https://docs.flybywiresim.com/pilots-corner/beginner-guide/powering-down/)',
        '- [Abbreviations](https://docs.flybywiresim.com/pilots-corner/abbreviations/)',
    ]),
});

export const beginner: MessageCommandDefinition = {
    name: ['beginnerguide', 'bg'],
    description: 'Provides a link to the Beginner Guide',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: beginnerEmbed,
};
