import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SIMBRIEF_INTEGRATION_IMAGE_URL = 'https://cdn.discordapp.com/attachments/945012754589298721/945056041656279130/unknown.png';

export const simbriefimport: CommandDefinition = {
    name: ['import', 'integration', 'integ'],
    description: 'Shows how to use SimBrief integration ',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | SimBrief import',
        description: makeLines([
            'The A32NX has SimBrief integration, and you can create a flight plan in SimBrief and import it into the MCDU. There are some steps involved in doing this, so please refer to our documentation on more information. https://docs.flybywiresim.com/pilots-corner/beginner-guide/preflight/#flight-plan-import (The image below is how it will look once everything has been set up properly)'
        ]),
        image: { url: Simbrief_request_URL},
    })),
};
