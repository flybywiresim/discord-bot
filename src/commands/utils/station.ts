import request from 'request';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const station: CommandDefinition = {
    name: 'station',
    description: 'Provides station information',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.station\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            await msg.reply('please provide an ICAO airport code.');
            return Promise.resolve();
        }
        const icaoArg = splitUp[1];
        request({
            method: 'GET',
            url: `https://avwx.rest/api/station/${icaoArg}`,
            headers: {
                Authorization: process.env.STATION_TOKEN },
        }, async (error, response, body) => {
            let stationEmbed;

            if(response.statusCode == 200) {
                // Response OK, parse the JSON
                const stationReport = JSON.parse(body);

                const runwayIdents = stationReport.runways.map((runways) => {
                    return `**${runways.ident1}/${runways.ident2}:** `
                        +`${runways.length_ft} ft x ${runways.width_ft} ft / `
                        +`${Math.round(runways.length_ft * 0.3048)} m x ${Math.round(runways.width_ft * 0.3048)} m`;
                });

                stationEmbed = makeEmbed({
                    title: `Station Info | ${stationReport.icao}`,
                    description: makeLines([
                        '**Station Information:**',
                        `**Name:** ${stationReport.name}`,
                        `**Country:** ${stationReport.country}`,
                        `**City:** ${stationReport.city}`,
                        `**Latitude:** ${stationReport.latitude}°`,
                        `**Longitude:** ${stationReport.longitude}°`,
                        `**Elevation:** ${stationReport.elevation_m} m/${stationReport.elevation_ft} ft`,
                        ,
                        `**Runways (Ident1/Ident2: Length x Width):**`,
                        `${runwayIdents.toString( ).replace(/,/g,"\n")}`,
                        ,
                        `**Type:** ${stationReport.type.replace(/_/g," ")}`,
                        `**Website:** ${stationReport.website}`,
                        `**Wiki:** ${stationReport.wiki}`,
                    ]),
                    footer: { text: 'Due to limitations of the API, not all links may be up to date at all times.' }
                });
            } else if(response.statusCode == 400) {
                // Invalid ICAO/IATA code
                stationEmbed = makeEmbed({
                    title: `Station Error | ${icaoArg.toUpperCase()}`,
                    description: makeLines([
                        `${icaoArg.toUpperCase()} is not a valid station code!`,
                    ]),
                });
            } else {
                // Unknown error
                stationEmbed = makeEmbed({
                    title: `Station Error`,
                    description: makeLines([
                        `There was an unknown error with the station request!`,
                    ]),
                });
            }

            await msg.channel.send({ embeds: [stationEmbed] });

        });
    },
};



