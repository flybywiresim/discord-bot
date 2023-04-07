import fetch from 'node-fetch';
import { Colors } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';
import Logger from '../../lib/logger';

export const station: CommandDefinition = {
    name: 'station',
    description: 'Provides station information',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.station\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            const noQueryEmbed = makeEmbed({
                title: 'Station Error | Missing Query',
                description: 'You must provide an airport ICAO code.',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [noQueryEmbed] });
            return;
        }
        const icaoArg = splitUp[1];

        try {
            const stationReport = await fetch(`https://avwx.rest/api/station/${icaoArg}`, {
                method: 'GET',
                headers: { Authorization: process.env.STATION_TOKEN },
            }).then((res) => res.json());

            if (stationReport.error) {
                const invalidEmbed = makeEmbed({
                    title: `Station Error | ${icaoArg.toUpperCase()}`,
                    description: stationReport.error,
                    color: Colors.Red,
                });
                await msg.reply({ embeds: [invalidEmbed] });
                return;
            }

            const runwayIdents = stationReport.runways.map((runways) => `**${runways.ident1}/${runways.ident2}:** `
                + `${runways.length_ft} ft x ${runways.width_ft} ft / `
                + `${Math.round(runways.length_ft * 0.3048)} m x ${Math.round(runways.width_ft * 0.3048)} m`);

            const stationEmbed = makeEmbed({
                title: `Station Info | ${stationReport.icao}`,
                description: makeLines([
                    '**Station Information:**',
                    `**Name:** ${stationReport.name}`,
                    `**Country:** ${stationReport.country}`,
                    `**City:** ${stationReport.city}`,
                    `**Latitude:** ${stationReport.latitude}°`,
                    `**Longitude:** ${stationReport.longitude}°`,
                    `**Elevation:** ${stationReport.elevation_m} m/${stationReport.elevation_ft} ft`,
                    '',
                    '**Runways (Ident1/Ident2: Length x Width):**',
                    `${runwayIdents.toString().replace(/,/g, '\n')}`,
                    '',
                    `**Type:** ${stationReport.type.replace(/_/g, ' ')}`,
                    `**Website:** ${stationReport.website}`,
                    `**Wiki:** ${stationReport.wiki}`,
                ]),
                footer: { text: 'Due to limitations of the API, not all links may be up to date at all times.' },
            });

            await replyWithEmbed(msg, stationEmbed);
            return;
        } catch (e) {
            Logger.error('station:', e);
            const fetchErrorEmbed = makeEmbed({
                title: 'Station Error | Fetch Error',
                description: 'There was an error fetching the station report. Please try again later.',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [fetchErrorEmbed] });
        }
    },
};
