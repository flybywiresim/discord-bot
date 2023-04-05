import { CommandCategory } from '../../constants';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';

const simbriefEmded = (flightplan) => makeEmbed({
    title: 'Simbrief Data',
    description: makeLines([
        `**Generated at:** ${flightplan.params.time_generated}`,
        `**Origin**: ${flightplan.origin.icao_code}`,
        `**Destination**: ${flightplan.destination.icao_code}`,
        `**Route**: ${flightplan.general.route}`,
    ]),

});

export const simbrief: CommandDefinition = {
    name: 'simbrief',
    description: 'Provides infos to the most recent simbrief flightplan',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.split(' ').slice(1);
        const simbriefId = splitUp[0];

        const flightplan = await fetch(`https://www.simbrief.com/api/xml.fetcher.php?json=1&userid=${simbriefId}`).then((res) => res.json());
        replyWithEmbed(msg, simbriefEmded(flightplan));

        return Promise.resolve();
    },

};
