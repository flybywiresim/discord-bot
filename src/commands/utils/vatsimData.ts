/* eslint-disable camelcase */
import fetch from 'node-fetch';
import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const DATA_VATSIM_URL = 'https://data.vatsim.net/v3/vatsim-data.json';

const helpEmbed = (evokedCommand: string) => makeEmbed({
    title: 'VATSIM Data - Help',
    description: 'This command allows you to retrieve information from VATSIM.',
    fields: [
        {
            name: 'VATSIM details',
            value: 'You can find all details about VATSIM [here](https://vatsim.net/).',
            inline: false,
        },
        {
            name: `Default usage: \`${evokedCommand} <callsign query>\``,
            value: 'Returns information for online Controllers and ATIS matching the callsign query; or online Pilots with matching callsigns if no Controllers or ATIS were found; or online Observers if no Pilots were found.',
            inline: false,
        },
        {
            name: `Statistics: \`${evokedCommand} stats [callsign query]\``,
            value: 'Returns statics about the number of online Pilots, Controllers, ATIS and Observers. If the optional callsign query is provided, it will only return statistics for callsigns matching the query.',
            inline: false,
        },
        {
            name: `Search online Controllers and ATIS: \`${evokedCommand} controllers <callsign query>\``,
            value: 'Returns information for Controllers and ATIS matching the callsign query.',
            inline: false,
        },
        {
            name: `Search online Pilots: \`${evokedCommand} pilots <callsign query>\``,
            value: 'Returns information for Pilots matching the callsign query.',
            inline: false,
        },
        {
            name: `Search online Observers: \`${evokedCommand} observers <callsign query>\``,
            value: 'Returns information for Observers matching the callsign query.',
            inline: false,
        },
    ],
});

const listEmbed = (type: string, fields: EmbedField[], totalCount: number, shownCount: number, callsign: string) => makeEmbed({
    title: `VATSIM Data - ${callsign} - ${totalCount} ${type} online`,
    description: `A list of ${shownCount} online ${type} matching ${callsign}.`,
    fields,
});

const statsEmbed = (pilots: string, controllers: string, atis: string, observers: string, callsign: string) => makeEmbed({
    title: callsign ? `VATSIM Data | Statistics for callsign ${callsign}` : 'VATSIM Data | Statistics',
    description: callsign ? `An overview of the current active Pilots, Controllers, ATIS and Observers matching ${callsign}.` : 'An overview of the current active Pilots, Controllers, ATIS and Observers.',
    fields: [
        {
            name: 'Pilots',
            value: pilots,
            inline: true,
        },
        {
            name: 'Controllers',
            value: controllers,
            inline: true,
        },
        {
            name: 'ATIS',
            value: atis,
            inline: true,
        },
        {
            name: 'Observers',
            value: observers,
            inline: true,
        },
    ],
});

const fetchErrorEmbed = (error: Error) => makeEmbed({
    title: 'VATSIM Data - Fetching data failure',
    description: `Could not fetch the VATSIM data from the VATSIM API service: ${error}`,
    color: Colors.Red,
});

const missingInfoEmbed = (information: string) => makeEmbed({
    title: 'VATSIM Data - Missing information',
    description: information,
    color: Colors.Red,
});

const notFoundEmbed = (callsign: string, information: string) => makeEmbed({
    title: `VATSIM Data - ${callsign} - Not online`,
    description: information,
    color: Colors.Yellow,
});

const controllersListEmbedFields = (callsign: string, frequency: string, logon: string, rating: string, atis: string, atisCode: string): EmbedField[] => {
    const fields = [
        {
            name: 'Callsign',
            value: `${callsign}`,
            inline: false,
        },
        {
            name: 'Frequency',
            value: `${frequency}`,
            inline: true,
        },
        {
            name: 'Logon Date & Time',
            value: `${logon}`,
            inline: true,
        },
        {
            name: 'Rating',
            value: `${rating}`,
            inline: true,
        },
    ];
    if (atis !== null) {
        let atisTitle = 'Info';
        if (atisCode) {
            atisTitle = `ATIS - Code: ${atisCode}`;
        } else if (atisCode !== undefined) {
            atisTitle = 'ATIS';
        }
        fields.push({
            name: atisTitle,
            value: atis,
            inline: false,
        });
    }

    return fields;
};

const pilotsListEmbedFields = (callsign: string, rating: string, flightPlan: any) => {
    const fields = [
        {
            name: 'Callsign',
            value: callsign,
            inline: false,
        },
        {
            name: 'Rating',
            value: rating,
            inline: true,
        },
    ];

    if (flightPlan !== null) {
        const { aircraft_short, departure, arrival } = flightPlan;
        fields.push(
            {
                name: 'Route',
                value: `${departure} - ${arrival}`,
                inline: true,
            },
            {
                name: 'Aircraft',
                value: `${aircraft_short}`,
                inline: true,
            },
        );
    }

    return fields;
};

const observersListEmbedFields = (callsign: string, logon: string, rating: string, atis: string): EmbedField[] => {
    const fields = [
        {
            name: 'Callsign',
            value: `${callsign}`,
            inline: false,
        },
        {
            name: 'Logon Date & Time',
            value: `${logon}`,
            inline: true,
        },
        {
            name: 'Rating',
            value: `${rating}`,
            inline: true,
        },
    ];
    if (atis !== null) {
        const atisTitle = 'Info';
        fields.push({
            name: atisTitle,
            value: atis,
            inline: false,
        });
    }

    return fields;
};

const handleLocaleDateTimeString = (date: Date) => date.toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
});

export const vatsimData: CommandDefinition = {
    name: ['vatsim', 'vatsimdata', 'vatdata'],
    description: 'Find if one or more VATSIM facilities are online at the moment.',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const evokedCommand = msg.content.split(/\s+/)[0];
        const args = msg.content.split(/\s+/).slice(1);

        if ((args.length < 1 && parseInt(args[1]) !== 0) || args[0] === 'help') {
            return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
        }

        let subCommand = args[0].toLowerCase();
        let [query] = args.slice(1);

        if (subCommand !== 'stats' && subCommand !== 'controllers' && subCommand !== 'pilots' && subCommand !== 'observers') {
            subCommand = 'all';
            [query] = args;
        }

        let commandMode = 'ALL';
        let notFoundMsg = 'No online VATSIM Controllers, ATIS, Pilots or Observers found matching your callsign search query.';

        switch (subCommand) {
        case 'stats':
            commandMode = 'STATS';
            break;
        case 'controllers':
            commandMode = 'CONTROLLERS';
            notFoundMsg = 'No online VATSIM Controllers or ATIS found matching your callsign search query.';
            break;
        case 'pilots':
            commandMode = 'PILOTS';
            notFoundMsg = 'No online VATSIM Pilots found matching your callsign search query.';
            break;
        case 'observers':
            commandMode = 'OBSERVERS';
            notFoundMsg = 'No online VATSIM Observers found matching your callsign search query.';
            break;
        default:
            break;
        }

        let vatsimData;
        try {
            vatsimData = await fetch(DATA_VATSIM_URL).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            });
        } catch (error) {
            return msg.reply({ embeds: [fetchErrorEmbed(error)] });
        }

        const vatsimAllControllers = vatsimData.controllers ? vatsimData.controllers.filter((controller) => controller.facility > 0) : null;
        const vatsimAllObservers = vatsimData.controllers ? vatsimData.controllers.filter((controller) => controller.facility <= 0) : null;

        if (commandMode === 'STATS' && !query) {
            const vatsimPilotCount = vatsimData.pilots ? vatsimData.pilots.length : 0;
            const vatsimControllerCount = vatsimAllControllers ? vatsimAllControllers.length : 0;
            const vatsimAtisCount = vatsimData.atis ? vatsimData.atis.length : 0;
            const vatsimObserverCount = vatsimAllObservers ? vatsimAllObservers.length : 0;
            return replyWithEmbed(msg, statsEmbed(vatsimPilotCount, vatsimControllerCount, vatsimAtisCount, vatsimObserverCount, null));
        }

        if (!query) {
            return msg.reply({ embeds: [missingInfoEmbed(`You need to provide a single callsign or part of a callsign to search for. Check \`${evokedCommand} help\` for more details.`)] });
        }

        query = query.toUpperCase();

        const regexCheck = /^["']?(?<callsignSearch>[\w-]+)?["']?\s*$/;
        const regexMatches = query.match(regexCheck);

        if (!regexMatches || !regexMatches.groups || !regexMatches.groups.callsignSearch) {
            return msg.reply({ embeds: [missingInfoEmbed(`You need to provide a valid callsign or part of a callsign to search for. Check \`${evokedCommand} help\` for more details.`)] });
        }

        const { callsignSearch } = regexMatches.groups;

        const vatsimPilotRatings = vatsimData.pilot_ratings ? vatsimData.pilot_ratings : null;
        const vatsimControllerRatings = vatsimData.ratings ? vatsimData.ratings : null;
        const vatsimPilots = vatsimData.pilots ? vatsimData.pilots.filter((pilot) => pilot.callsign.includes(callsignSearch)) : null;
        const vatsimControllers = vatsimAllControllers ? vatsimAllControllers.filter((controller) => controller.callsign.includes(callsignSearch)) : null;
        const vatsimAtis = vatsimData.atis ? vatsimData.atis.filter((atis) => atis.callsign.includes(callsignSearch)) : null;
        const vatsimObservers = vatsimAllObservers ? vatsimAllObservers.filter((observer) => observer.callsign.includes(callsignSearch)) : null;

        const { keys }: ObjectConstructor = Object;

        if (commandMode === 'STATS') {
            const vatsimPilotCount = vatsimPilots ? vatsimPilots.length : 0;
            const vatsimControllerCount = vatsimControllers ? vatsimControllers.length : 0;
            const vatsimAtisCount = vatsimAtis ? vatsimAtis.length : 0;
            const vatsimObserverCount = vatsimObservers ? vatsimObservers.length : 0;
            return replyWithEmbed(msg, statsEmbed(vatsimPilotCount, vatsimControllerCount, vatsimAtisCount, vatsimObserverCount, callsignSearch));
        }

        if ((keys(vatsimControllers).length !== 0 || keys(vatsimAtis).length !== 0) && (commandMode === 'ALL' || commandMode === 'CONTROLLERS')) {
            const fields: EmbedField[] = [...vatsimControllers.sort((a, b) => b.facility - a.facility), ...vatsimAtis]
                .map((vatsimController) => {
                    const { callsign, frequency, logon_time, atis_code, text_atis, rating } = vatsimController;
                    const logonTime = new Date(logon_time);
                    const logonTimeString = handleLocaleDateTimeString(logonTime);
                    const ratingDetail = vatsimControllerRatings.filter((ratingInfo) => ratingInfo.id === rating);
                    const { short, long } = ratingDetail[0];
                    const ratingText = `${short} - ${long}`;
                    const atisText = text_atis ? text_atis.join('\n') : null;

                    return controllersListEmbedFields(callsign, frequency, logonTimeString, ratingText, atisText, atis_code);
                }).slice(0, 5).flat();

            const totalCount = keys(vatsimControllers).length + keys(vatsimAtis).length;
            const shownCount = totalCount < 5 ? totalCount : 5;

            return replyWithEmbed(msg, listEmbed('Controllers & ATIS', fields, totalCount, shownCount, callsignSearch));
        }

        if (keys(vatsimPilots).length !== 0 && (commandMode === 'ALL' || commandMode === 'PILOTS')) {
            const fields: EmbedField[] = [...vatsimPilots.sort((a, b) => b.pilot_rating - a.pilot_rating)].map((vatsimPilot) => {
                const { callsign, pilot_rating, flight_plan } = vatsimPilot;
                const ratingDetail = vatsimPilotRatings.filter((ratingInfo: { id: number; }) => ratingInfo.id === pilot_rating);
                const { short_name, long_name } = ratingDetail[0];
                const ratingText = `${short_name} - ${long_name}`;

                return pilotsListEmbedFields(callsign, ratingText, flight_plan);
            }).slice(0, 5).flat();

            const totalCount = keys(vatsimPilots).length;
            const shownCount = totalCount < 5 ? totalCount : 5;

            return replyWithEmbed(msg, listEmbed('Pilots', fields, totalCount, shownCount, callsignSearch));
        }

        if (keys(vatsimObservers).length !== 0 && (commandMode === 'ALL' || commandMode === 'OBSERVERS')) {
            const fields: EmbedField[] = [...vatsimObservers.sort((a, b) => b.rating - a.rating)].map((vatsimObserver) => {
                const { callsign, logon_time, text_atis, rating } = vatsimObserver;
                const logonTime = new Date(logon_time);
                const logonTimeString = handleLocaleDateTimeString(logonTime);
                const ratingDetail = vatsimControllerRatings.filter((ratingInfo) => ratingInfo.id === rating);
                const { short, long } = ratingDetail[0];
                const ratingText = `${short} - ${long}`;
                const atisText = text_atis ? text_atis.join('\n') : null;

                return observersListEmbedFields(callsign, logonTimeString, ratingText, atisText);
            }).slice(0, 5).flat();

            const totalCount = keys(vatsimObservers).length;
            const shownCount = totalCount < 5 ? totalCount : 5;

            return replyWithEmbed(msg, listEmbed('Observers', fields, totalCount, shownCount, callsignSearch));
        }

        return msg.reply({ embeds: [notFoundEmbed(callsignSearch, notFoundMsg)] });
    },
};
