import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const atc: CommandDefinition = {
    name: 'atc',
    category: CommandCategory.A32NX,
    description: 'Provides details on the use of the built-in ATC and a link to the cFMS special notes section.',
    executor: (msg) => {
        const atcEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Using the built-in Microsoft Flight Simulator ATC',
            description: makeLines([
                'There are multiple ways of using the built-in ATC of MSFS:',
            ]),
            fields: [
                {
                    name: 'Synchronizing the MCDU flight plan back to MSFS ATC',
                    value: 'In this mode, you only select a departure airport and gate (or runway). You should not select a destination airport. Once the EFB setting for **Sync MSFS Flight Plan** is set to **Save**, any flight plan entered, or loaded, into the MCDU F-PLN page, will be synced to the MSFS ATC service.',
                    inline: false,
                },
                {
                    name: 'Loading the same flight plan in the World Planner and the MCDU',
                    value: 'In this mode, the EFB setting for **Sync MSFS Flight Plan** should be set to **None**. You can then load a flight plan into the World Planner (for instance through exporting it from Simbrief, or by letting the World Planner build one for you) and once the aircraft has loaded and has been powered up, you enter or load the same flight plan in the MCDU.',
                    inline: false,
                },
                {
                    name: 'More information',
                    value: 'Please read cFMS special notes [here.](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/cFMS/#special-notes)',
                    inline: false,
                },
            ],
        });

        return msg.channel.send({ embeds: [atcEmbed] });
    },
};
