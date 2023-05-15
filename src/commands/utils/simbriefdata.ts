import fetch from 'node-fetch';
import { Colors } from 'discord.js';
import moment from 'moment';
import { CommandCategory } from '../../constants';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';

const simbriefEmded = (flightplan) => makeEmbed({
    title: 'SimBrief Data',
    description: makeLines([
        `**Generated at**: ${moment(flightplan.params.time_generated * 1000).format('DD.MM.YYYY, HH:mm:ss')}`,
        `**AirFrame**: ${flightplan.aircraft.name} ${flightplan.aircraft.internal_id}`,
        `**AIRAC Cycle**: ${flightplan.params.airac}`,
        `**Origin**: ${flightplan.origin.icao_code}`,
        `**Destination**: ${flightplan.destination.icao_code}`,
        `**Route**: ${flightplan.general.route}`,
    ]),

});

const simbriefIdMismatchEmbed = (enteredId, flightplanId) => makeEmbed({
    title: 'SimBrief Data',
    description: makeLines([
        `Entered userId ${enteredId} and returned userId ${flightplanId} don't match. The userId might be used as username by someone else.`,
    ]),
});

const errorEmbed = (errorMessage) => makeEmbed({
    title: 'SimBrief Error',
    description: makeLines(['SimBrief data could not be read.', errorMessage]),
    color: Colors.Red,
});

const simbriefdatarequestEmbed = makeEmbed({
    title: 'FlyByWire Support | SimBrief Data Request',
    description: makeLines([
        'To evaluate your problem we kindly ask you to enter the following bot command into a new message.',
        '```.simbriefdata <userId>```',
        'Replace <userId> incl. the brackets with your simbrief userId or userName. The Bot will read your last generated flight plan and display some details about it incl. the route.',
        '',
        '**Privacy notice**: If you share your userId or username it is possible to read your pilot name from the API the bot uses. This pilot name is by default your real name, but you can change it in the flight edit screen or your user profile in SimBrief. No data is stored by FlyByWire when using the command.',
    ]),
});

export const simbriefdata: CommandDefinition = {
    name: 'simbriefdata',
    description: 'Provides infos to the most recent SimBrief flightplan',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.split(' ').slice(1);
        const simbriefId = splitUp[0];
        if (simbriefId === undefined || simbriefId === null) {
            return replyWithEmbed(msg, simbriefdatarequestEmbed);
        }

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
