import fetch from 'node-fetch';
import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
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
            value: 'Returns information for online Controllers, Observers and ATIS matching the callsign query; or online Pilots with matching callsigns if no Controllers, Observers or ATIS were found.',
            inline: false,
        },
        {
            name: `Statistics: \`${evokedCommand} stats\``,
            value: 'Returns statics about the number of online Pilots, Controllers and ATIS',
            inline: false,
        },
        {
            name: `Search online Controllers and ATIS: \`${evokedCommand} controllers <callsign query>\``,
            value: 'Returns information for Controllers, Observers and ATIS matching the callsign query.',
            inline: false,
        },
        {
            name: `Search online Pilots: \`${evokedCommand} pilots <callsign query>\``,
            value: 'Returns information for Pilots matching the callsign query.',
            inline: false,
        },
    ],
});

const listEmbed = (type: string, fields: EmbedField[], totalCount: number, shownCount: number, callsign: string) => makeEmbed({
    title: `VATSIM Data - ${callsign} - ${totalCount} ${type} online`,
    description: `A list of ${shownCount} online ${type} matching ${callsign}.`,
    fields,
});

const statsEmbed = (pilots: string, controllers: string, atis: string) => makeEmbed({
    title: 'VATSIM Data | Statistics',
    description: 'An overview of the current active Pilots, Controllers and ATIS.',
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
        const atisTitle = atisCode ? `ATIS - Code: ${atisCode}` : 'ATIS';
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
                // eslint-disable-next-line camelcase
                value: `${aircraft_short}`,
                inline: true,
            },
        );
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
            return msg.channel.send({ embeds: [helpEmbed(evokedCommand)] });
        }

        let subCommand = args[0].toLowerCase();
        let [subArgs] = args.slice(1);
        if (subCommand !== 'stats' && subCommand !== 'controllers' && subCommand !== 'pilots') {
            subCommand = 'all';
            [subArgs] = args;
        }

        let commandMode = 'ALL';
        let notFoundMsg = 'No online VATSIM Controllers, Observers, ATIS or Pilots found matching your callsign search query.';
        switch (subCommand) {
        case 'stats':
            commandMode = 'STATS';
            break;
        case 'controllers':
            commandMode = 'CONTROLLERS';
            notFoundMsg = 'No online VATSIM Controllers, Observers or ATIS found matching your callsign search query.';
            break;
        case 'pilots':
            commandMode = 'PILOTS';
            notFoundMsg = 'No online VATSIM Pilots found matching your callsign search query.';
            break;
        default:
            break;
        }

        let vatsimData;
        try {
            vatsimData = await fetch(DATA_VATSIM_URL)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                });
        } catch (error) {
            return msg.channel.send({ embeds: [fetchErrorEmbed(error)] });
        }

        if (commandMode === 'STATS') {
            const vatsimPilotCount = vatsimData.pilots ? vatsimData.pilots.length : 0;
            const vatsimControllerCount = vatsimData.controllers ? vatsimData.controllers.length : 0;
            const vatsimAtisCount = vatsimData.atis ? vatsimData.atis.length : 0;
            return msg.channel.send({ embeds: [statsEmbed(vatsimPilotCount, vatsimControllerCount, vatsimAtisCount)] });
        }

        if (!subArgs) {
            return msg.channel.send({ embeds: [missingInfoEmbed(`You need to provide a single callsign or part of a callsign to search for. Check \`${evokedCommand} help\` for more details.`)] });
        }

        const regexCheck = /^["']?(?<callsignSearch>[\w-]+)?["']?\s*$/;
        const regexMatches = subArgs.match(regexCheck);
        if (!regexMatches || !regexMatches.groups || !regexMatches.groups.callsignSearch) {
            return msg.channel.send({ embeds: [missingInfoEmbed(`You need to provide a valid callsign or part of a callsign to search for. Check \`${evokedCommand} help\` for more details.`)] });
        }

        const { callsignSearch } = regexMatches.groups;
        const vatsimPilotRatings = vatsimData.pilot_ratings ? vatsimData.pilot_ratings : null;
        const vatsimControllerRatings = vatsimData.ratings ? vatsimData.ratings : null;
        const vatsimPilots = vatsimData.pilots ? vatsimData.pilots.filter((pilot) => pilot.callsign.includes(callsignSearch)) : null;
        const vatsimControllers = vatsimData.controllers ? vatsimData.controllers.filter((controller) => controller.callsign.includes(callsignSearch)) : null;
        const vatsimAtis = vatsimData.atis ? vatsimData.atis.filter((atis) => atis.callsign.includes(callsignSearch)) : null;

        if ((Object.keys(vatsimControllers).length !== 0 || Object.keys(vatsimAtis).length !== 0) && (commandMode === 'ALL' || commandMode === 'CONTROLLERS')) {
            const fields: EmbedField[] = [...vatsimControllers.sort((a, b) => b.facility - a.facility), ...vatsimAtis].map((vatsimItem) => {
                // eslint-disable-next-line camelcase
                const { callsign, frequency, logon_time, atis_code, text_atis, rating } = vatsimItem;
                const logonTime = new Date(logon_time);
                const logonTimeString = handleLocaleDateTimeString(logonTime);
                const ratingDetail = vatsimControllerRatings.filter((ratingInfo) => ratingInfo.id === rating);
                const { short, long } = ratingDetail[0];
                const ratingText = `${short} - ${long}`;
                // eslint-disable-next-line camelcase
                const atisText = text_atis ? text_atis.join('\n') : null;
                return controllersListEmbedFields(callsign, frequency, logonTimeString, ratingText, atisText, atis_code);
            }).slice(0, 5).flat();

            const totalCount = Object.keys(vatsimControllers).length + Object.keys(vatsimAtis).length;
            const shownCount = totalCount < 5 ? totalCount : 5;
            return msg.channel.send({ embeds: [listEmbed('Controllers, Observers & ATIS', fields, totalCount, shownCount, callsignSearch)] });
        }
        if (Object.keys(vatsimPilots).length !== 0 && (commandMode === 'ALL' || commandMode === 'PILOTS')) {
            const fields: EmbedField[] = [...vatsimPilots.sort((a, b) => b.pilot_rating - a.pilot_rating)].map((vatsimItem) => {
                // eslint-disable-next-line camelcase
                const { callsign, pilot_rating, flight_plan } = vatsimItem;
                // eslint-disable-next-line camelcase
                const ratingDetail = vatsimPilotRatings.filter((ratingInfo) => ratingInfo.id === pilot_rating);
                // eslint-disable-next-line camelcase
                const { short_name, long_name } = ratingDetail[0];
                // eslint-disable-next-line camelcase
                const ratingText = `${short_name} - ${long_name}`;
                return pilotsListEmbedFields(callsign, ratingText, flight_plan);
            }).slice(0, 5).flat();

            const totalCount = Object.keys(vatsimPilots).length;
            const shownCount = totalCount < 5 ? totalCount : 5;
            return msg.channel.send({ embeds: [listEmbed('Pilots', fields, totalCount, shownCount, callsignSearch)] });
        }
        return msg.channel.send({ embeds: [notFoundEmbed(callsignSearch, notFoundMsg)] });
    },
};
