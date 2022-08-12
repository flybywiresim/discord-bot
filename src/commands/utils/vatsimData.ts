import fetch from 'node-fetch';
import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import Logger from '../../lib/logger';
import { makeEmbed } from '../../lib/embed';

const DATA_VATSIM_URL = 'https://data.vatsim.net/v3/vatsim-data.json';

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
        const subcommandTerms = msg.content.replace(/\.(vatsim|vatsimdata|vatdata)\s+/, ' ');
        let searchTerms = subcommandTerms.split(' ');
        if (searchTerms.length <= 1) {
            const fields: EmbedField[] = [
                {
                    name: 'VATSIM details',
                    value: 'You can find all details about VATSIM [here](https://vatsim.net/).',
                    inline: false,
                },
                {
                    name: 'Default usage: `.vatsim <callsign query>`',
                    value: 'Returns information for online Controllers, Observers and ATIS matching the callsign query; or online Pilots with matching callsigns if no Controllers, Observers or ATIS were found.',
                    inline: false,
                },
                {
                    name: 'Statistics: `.vatsim stats`',
                    value: 'Returns statics about the number of online Pilots, Controllers and ATIS',
                    inline: false,
                },
                {
                    name: 'Search online Controllers and ATIS: `.vatsim controllers <callsign query>`',
                    value: 'Returns information for Controllers, Observers and ATIS matching the callsign query.',
                    inline: false,
                },
                {
                    name: 'Search online Pilots: `.vatsim pilots <callsign query>`',
                    value: 'Returns information for Pilots matching the callsign query.',
                    inline: false,
                },
            ];
            const defaultEmbed = makeEmbed({
                title: 'VATSIM Data command overview',
                description: 'This command allows you to retrieve information from VATSIM.',
                fields,
            });
            return msg.channel.send({ embeds: [defaultEmbed] });
        }

        let commandMode = 'ALL';
        let notFoundMsg = 'No online VATSIM Controllers, Observers, ATIS or Pilots found matching your search query.';
        if (subcommandTerms.startsWith(' stats')) {
            commandMode = 'STATS';
        } else if (subcommandTerms.startsWith(' controllers')) {
            searchTerms = subcommandTerms.replace(/\scontrollers\s+/, ' ').split(' ');
            commandMode = 'CONTROLLERS';
            notFoundMsg = 'No online VATSIM Controllers, Observers or ATIS found matching your search query.';
        } else if (subcommandTerms.startsWith(' pilots')) {
            searchTerms = subcommandTerms.replace(/\spilots\s+/, ' ').split(' ');
            commandMode = 'PILOTS';
            notFoundMsg = 'No online VATSIM Pilots found matching your search query.';
        }

        try {
            const vatsimData = await fetch(DATA_VATSIM_URL)
                .then((res) => res.json());

            if (commandMode === 'STATS') {
                const fields: EmbedField[] = [
                    {
                        name: 'Pilots',
                        value: vatsimData.pilots ? vatsimData.pilots.length : 0,
                        inline: true,
                    },
                    {
                        name: 'Controllers',
                        value: vatsimData.controllers ? vatsimData.controllers.length : 0,
                        inline: true,
                    },
                    {
                        name: 'ATIS',
                        value: vatsimData.atis ? vatsimData.atis.length : 0,
                        inline: true,
                    },
                ];
                const statsEmbed = makeEmbed({
                    title: 'VATSIM Data | Statistics',
                    description: 'An overview of the current active Pilots, Controllers and ATIS.',
                    fields,
                });
                return msg.channel.send({ embeds: [statsEmbed] });
            }

            const searchTerm = searchTerms[1].toUpperCase();
            const vatsimPilotRatings = vatsimData.pilot_ratings ? vatsimData.pilot_ratings : null;
            const vatsimControllerRatings = vatsimData.ratings ? vatsimData.ratings : null;
            const vatsimPilots = vatsimData.pilots ? vatsimData.pilots.filter((pilot) => pilot.callsign.includes(searchTerm)) : null;
            const vatsimControllers = vatsimData.controllers ? vatsimData.controllers.filter((controller) => controller.callsign.includes(searchTerm)) : null;
            const vatsimAtis = vatsimData.atis ? vatsimData.atis.filter((atis) => atis.callsign.includes(searchTerm)) : null;

            let responseEmbed;
            if ((Object.keys(vatsimControllers).length !== 0 || Object.keys(vatsimAtis).length !== 0) && (commandMode === 'ALL' || commandMode === 'CONTROLLERS')) {
                const fields: EmbedField[] = [...vatsimControllers.sort((a, b) => b.facility - a.facility), ...vatsimAtis].map((vatsimItem) => {
                    // eslint-disable-next-line camelcase
                    const { callsign, frequency, logon_time, atis_code, text_atis, rating } = vatsimItem;
                    const logonTime = new Date(logon_time);
                    const logonTimeString = handleLocaleDateTimeString(logonTime);
                    const ratingDetail = vatsimControllerRatings.filter((ratingInfo) => ratingInfo.id === rating);
                    const ratingText = `${ratingDetail[0].short} - ${ratingDetail[0].long}`;
                    const data = [
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
                            value: `${logonTimeString}`,
                            inline: true,
                        },
                        {
                            name: 'Rating',
                            value: `${ratingText}`,
                            inline: true,
                        },
                    ];

                    // eslint-disable-next-line camelcase
                    if (text_atis !== null) {
                        // eslint-disable-next-line camelcase
                        const atisTitle = atis_code ? `ATIS - Code: ${atis_code}` : 'ATIS';
                        data.push({
                            name: `${atisTitle}`,
                            // eslint-disable-next-line camelcase
                            value: `${text_atis}`,
                            inline: false,
                        });
                    }

                    return data;
                }).slice(0, 5).flat();

                const totalCount = Object.keys(vatsimControllers).length + Object.keys(vatsimAtis).length;
                const shownCount = totalCount <= 5 ? totalCount : 5;
                responseEmbed = makeEmbed({
                    title: `VATSIM Data | ${searchTerm} - ${totalCount} Controllers, Observers & ATIS online`,
                    description: `A list of ${shownCount} online VATSIM Controllers, Observers & ATIS matching ${searchTerm}`,
                    fields,
                });
            } else if (Object.keys(vatsimPilots).length !== 0 && (commandMode === 'ALL' || commandMode === 'PILOTS')) {
                const fields: EmbedField[] = [...vatsimPilots.sort((a, b) => b.pilot_rating - a.pilot_rating)].map((vatsimItem) => {
                    // eslint-disable-next-line camelcase
                    const { callsign, pilot_rating, flight_plan } = vatsimItem;
                    // eslint-disable-next-line camelcase
                    const ratingDetail = vatsimPilotRatings.filter((ratingInfo) => ratingInfo.id === pilot_rating);
                    const ratingText = `${ratingDetail[0].short_name} - ${ratingDetail[0].long_name}`;
                    const data = [
                        {
                            name: 'Callsign',
                            value: `${callsign}`,
                            inline: false,
                        },
                        {
                            name: 'Rating',
                            value: `${ratingText}`,
                            inline: true,
                        },
                    ];

                    // eslint-disable-next-line camelcase
                    if (flight_plan !== null) {
                        // eslint-disable-next-line camelcase
                        const { aircraft_short, departure, arrival } = flight_plan;
                        data.push(
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

                    return data;
                }).slice(0, 5).flat();

                const totalCount = Object.keys(vatsimPilots).length;
                const shownCount = totalCount <= 5 ? totalCount : 5;
                responseEmbed = makeEmbed({
                    title: `VATSIM Data | ${searchTerm} - ${totalCount} Pilot(s) online`,
                    description: `A list of ${shownCount} online VATSIM Pilots matching ${searchTerm}`,
                    fields,
                });
            } else {
                responseEmbed = makeEmbed({
                    title: `VATSIM Data | ${searchTerm} - Offline or Not found`,
                    description: notFoundMsg,
                });
            }

            return msg.channel.send({ embeds: [responseEmbed] });
        } catch (err) {
            Logger.error(err);
            const errorEmbed = makeEmbed({
                title: 'VATSIM Data Error',
                description: err.message,
                color: Colors.Red,
            });
            return msg.channel.send({ embeds: [errorEmbed] });
        }
    },
};
