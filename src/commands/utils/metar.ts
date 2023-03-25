import fetch from 'node-fetch';
import { Colors } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory, Units } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';
import Logger from '../../lib/logger';

export const metar: CommandDefinition = {
    name: 'metar',
    description: 'Provides the METAR report of the requested airport',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.metar\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            const noQueryEmbed = makeEmbed({
                title: 'Metar Error | Missing Query',
                description: 'You must provide an airport ICAO code.',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [noQueryEmbed] });
            return Promise.resolve();
        }
        const icaoArg = splitUp[1];

        try {
            const metarReport = await fetch(`https://avwx.rest/api/metar/${icaoArg}`, {
                method: 'GET',
                headers: { Authorization: process.env.METAR_TOKEN },
            }).then((res) => res.json());

            if (metarReport.error) {
                const invalidEmbed = makeEmbed({
                    title: `Metar Error | ${icaoArg.toUpperCase()}`,
                    description: metarReport.error,
                    color: Colors.Red,
                });
                await msg.reply({ embeds: [invalidEmbed] });
                return Promise.resolve();
            }

            const metarEmbed = makeEmbed({
                title: `METAR Report | ${metarReport.station}`,
                description: makeLines([
                    '**Raw Report**',
                    metarReport.raw,
                    '',
                    '**Basic Report:**',
                    `**Time Observed:** ${metarReport.time.dt}`,
                    `**Station:** ${metarReport.station}`,
                    `**Wind:** ${metarReport.wind_direction.repr}${metarReport.wind_direction.repr === 'VRB' ? '' : Units.DEGREES} at ${metarReport.wind_speed.repr} ${metarReport.units.wind_speed}`,
                    `**Visibility:** ${metarReport.visibility.repr} ${Number.isNaN(+metarReport.visibility.repr) ? '' : metarReport.units.visibility}`,
                    `**Temperature:** ${metarReport.temperature.repr} ${Units.CELSIUS}`,
                    `**Dew Point:** ${metarReport.dewpoint.repr} ${Units.CELSIUS}`,
                    `**Altimeter:** ${metarReport.altimeter.value.toString()} ${metarReport.units.altimeter}`,
                    `**Flight Rules:** ${metarReport.flight_rules}`,
                ]),
                fields: [
                    {
                        name: 'Unsure of how to read the raw report?',
                        value: 'Please refer to our guide [here.](https://docs.flybywiresim.com/pilots-corner/airliner-flying-guide/weather/)',
                        inline: false,
                    },
                ],
                footer: { text: 'This METAR report may not accurately reflect the weather in the simulator. However, it will always be similar to the current conditions present in the sim.' },
            });

            await replyWithEmbed(msg, metarEmbed);
        } catch (e) {
            Logger.error('metar:', e);
            const fetchErrorEmbed = makeEmbed({
                title: 'Metar Error | Fetch Error',
                description: 'There was an error fetching the METAR report. Please try again later.',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [fetchErrorEmbed] });
        }
        return Promise.resolve();
    },
};
