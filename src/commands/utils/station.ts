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

            const stationReport = JSON.parse(body);

            const runwayIdents = stationReport.runways.map((runways) => {
                return `**${runways.ident1}/${runways.ident2}:** ${runways.length_ft}ft x ${runways.width_ft}ft`;
            });

            const stationEmbed = makeEmbed({
                title: `Station info | ${stationReport.icao}`,
                description: makeLines([
                    '**Station Information:**',
                    `**Name:** ${stationReport.name}`,
                    `**Country:** ${stationReport.country}`,
                    `**City:** ${stationReport.city}`,
                    `**Latitude:** ${stationReport.latitude}`,
                    `**Longitude:** ${stationReport.longitude}`,
                    `**Elevation:** ${stationReport.elevation_m}m/${stationReport.elevation_ft}ft`,
                    ,
                    `**Runways (Ident1/Ident2: Length x Width):**`,
                    `${runwayIdents.toString( ).replace(/,/g,"")}`,
                    `**Type:** ${stationReport.type.replace(/_/g," ")}`,
                    `**Website:** ${stationReport.website}`,
                    `**Wiki:** ${stationReport.wiki}`,
                ]),
                footer: { text: 'Due to limitations of the API, not all links may be up to date at all times.' }
            });

            await msg.channel.send({ embeds: [stationEmbed] });

        });
    },
};



