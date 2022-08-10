import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const tcas: CommandDefinition = {
    name: 'tcas',
    description: 'Provides support information about A32NX AP/FD TCAS',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const tcasEmbed = makeEmbed({
            title: 'FlyByWire A32NX | AP/FD TCAS',
            description: makeLines([
                'The A32NX utilizes AP/FD TCAS by Airbus which allows for fully automated flight for both traffic advisories (TA) and resolution advisories (RA).',
                '',
                'Our implementation is capable of handling TA/RAs while on an ATC network such as VATSIM/IVAO or with the live traffic feature in MSFS.',
                '',
                'For details on how the system functions, known issues, and pilot actions see our [Advanced Guide: TCAS](https://docs.flybywiresim.com/pilots-corner/advanced-guides/flight-guidance/tcas/).',
            ]),
        });

        await msg.channel.send({ embeds: [tcasEmbed] });
    },
};
