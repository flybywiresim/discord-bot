import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const atcEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Using the built-in Microsoft Flight Simulator ATC',
    description: 'There are multiple ways of using the built-in ATC of MSFS:',
    fields: [
        {
            name: 'Loading a Flight Plan from the MSFS World Map',
            value: 'Ensures the Flight Plan from the MSFS World Map is imported into the aircraft\'s MCDU, without synchronizing changes back to MSFS ATC.',
            inline: false,
        },
        {
            name: 'Using a Flight Plan from the MSFS World Map with MSFS ATC',
            value: 'This mode loads the Flight Plan from the MSFS World Map into the aircraft\'s MCDU and attempts to synchronize all changes made back to MSFS ATC.',
            inline: false,
        },
        {
            name: 'Importing a SimBrief Flight Plan and using MSFS ATC',
            value: 'When importing the Flight Plan from SimBrief and not building a Flight Plan through the MSFS World Map, this mode will attempt to synchronize the Flight Plan back to MSFS ATC.',
            inline: false,
        },
        {
            name: 'More information',
            value: 'Please read the [Flight Planning Guide](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/flight-planning/) for more details.',
            inline: false,
        },
    ],
});

export const atc: MessageCommandDefinition = {
    name: ['atc', 'flightplanning'],
    category: CommandCategory.AIRCRAFT,
    description: 'Provides details on the use of the built-in ATC and a link to the cFMS special notes section.',
    genericEmbed: atcEmbed,
};
