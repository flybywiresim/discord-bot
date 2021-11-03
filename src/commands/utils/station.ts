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
            msg.channel.send(makeEmbed({
                title: `Station info | ${stationReport.icao}`,
                description: makeLines([
                    '**Station Information:**',
                    `**Name:** ${stationReport.name}`,
                    `**Country:** ${stationReport.country}`,
                    `**City:** ${stationReport.city}`,
                    `**Latitude:** ${stationReport.latitude}`,
                    `**longitude:** ${stationReport.longitude}`,
                    ,
                    `**Runways:** ${stationReport.runways[0].ident1}`,
                    ,
                    `**Type:** ${stationReport.type}`,
                    `**Website:** ${stationReport.website}`,
                    `**Wiki:** ${stationReport.wiki}`,
                ]),
            }));
        });
    },
};