import { Colors } from 'discord.js';
import moment from 'moment';
import { CommandCategory } from '../../constants';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';

const simbriefEmded = (flightplan) => makeEmbed({
    title: 'Simbrief Data',
    description: makeLines([
        `**Generated at**: ${moment(flightplan.params.time_generated * 1000).format('DD.MM.YYYY, HH:mm:ss')}`,
        `**AirFrame**: ${flightplan.aircraft.name} ${flightplan.aircraft.internal_id}`,
        `**Origin**: ${flightplan.origin.icao_code}`,
        `**Destination**: ${flightplan.destination.icao_code}`,
        `**Route**: ${flightplan.general.route}`,
    ]),

});

const simbriefIdMismatchEmbed = (enteredId, flightplanId) => makeEmbed({
    title: 'Simbrief Data',
    description: makeLines([
        `Entered userId ${enteredId} and returned userId ${flightplanId} don't match. The UserId might be used as username by someone else.`,
    ]),
});

const errorEmbed = (errorMessage) => makeEmbed({
    title: 'Simbrief Error',
    description: makeLines(['Simbriefdata could not be read.', errorMessage]),
    color: Colors.Red,
});

export const simbriefdata: CommandDefinition = {
    name: 'simbriefdata',
    description: 'Provides infos to the most recent simbrief flightplan',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.split(' ').slice(1);
        const simbriefId = splitUp[0];

        const flightplan = await fetch(`https://www.simbrief.com/api/xml.fetcher.php?json=1&userid=${simbriefId}&username=${simbriefId}`).then((res) => res.json());

        if (flightplan.fetch.status !== 'Success') {
            msg.reply({ embeds: [errorEmbed(flightplan.fetch.status)] });
            return Promise.resolve();
        }

        if (!simbriefId.match(/\D/) && simbriefId !== flightplan.params.user_id) {
            replyWithEmbed(msg, simbriefIdMismatchEmbed(simbriefId, flightplan.params.user_id));
        }
        replyWithEmbed(msg, simbriefEmded(flightplan));

        return Promise.resolve();
    },

};
