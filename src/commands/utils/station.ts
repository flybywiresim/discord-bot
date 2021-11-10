import request from 'request';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const station: CommandDefinition = {
    name: 'station',
    description: 'Provides station information',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        const splitUp = msg.content.replace(/\.station\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            msg.reply('please provide an ICAO airport code.');
            return Promise.resolve();
        }
        const icaoArg = splitUp[1];
        request({
            method: 'GET',
            url: `https://avwx.rest/api/station/${icaoArg}`,
            headers: {
                Authorization: process.env.STATION_TOKEN },
        }, (error, response, body) => {

            const stationReport = JSON.parse(body);

            const runwayIdents = stationReport.runways.map((runways) => {
                return `**${runways.ident1}/${runways.ident2}:** ${runways.length_ft} x ${runways.width_ft}
                `;
            });


            msg.channel.send(makeEmbed({
                title: `Station info | ${stationReport.icao}`,
                description: makeLines([
                    '**Station Information:**',
                    `**Name:** ${stationReport.name}`,
                    `**Country:** ${stationReport.country}`,
                    `**City:** ${stationReport.city}`,
                    `**Latitude:** ${stationReport.latitude}`,
                    `**Longitude:** ${stationReport.longitude}`,
                    `**Elevation_m:** ${stationReport.elevation_m}`,
                    `**Elevation_ft:** ${stationReport.elevation_ft}`,
                    ,
                    `**Runways (Ident1/Ident2, Length/Width (ft)):**`,
                    `${runwayIdents.toString( )}`,
                    ,
                    `**Type:** ${stationReport.type}`,
                    `**Website:** ${stationReport.website}`,
                    `**Wiki:** ${stationReport.wiki}`,
                ]),
            }));
        });
    },
};



