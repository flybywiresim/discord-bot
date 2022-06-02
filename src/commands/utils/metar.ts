import request from 'request';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const metar: CommandDefinition = {
    name: 'metar',
    description: 'Provides the METAR report of the requested airport',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.metar\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            await msg.reply('please provide an ICAO airport code.');
            return Promise.resolve();
        }
        const icaoArg = splitUp[1];
        request({
            method: 'GET',
            url: `https://avwx.rest/api/metar/${icaoArg}`,
            headers: { Authorization: process.env.METAR_TOKEN },
        }, async (error, response, body) => {
            let metarEmbed;

            if (response.statusCode === 200) {
                // Response OK, parse the JSON
                const metarReport = JSON.parse(body);
                metarEmbed = makeEmbed({
                    title: `METAR Report | ${metarReport.station}`,
                    description: makeLines([
                        '**Raw Report**',
                        metarReport.raw,
                        '',
                        '**Basic Report:**',
                        `**Time Observed:** ${metarReport.time.dt}`,
                        `**Station:** ${metarReport.station}`,
                        `**Wind:** ${metarReport.wind_direction.repr}${metarReport.wind_direction.repr === "VRB" ? '': '°'} at ${metarReport.wind_speed.repr}kts`,
                        `**Visibility:** ${metarReport.visibility.repr}${isNaN(metarReport.visibility.repr) ? '' : metarReport.units.visibility}`,
                        `**Temperature:** ${metarReport.temperature.repr}C`,
                        `**Dew Point:** ${metarReport.dewpoint.repr}C`,
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
            } else if (response.statusCode === 400) {
                // Invalid ICAO/IATA code
                metarEmbed = makeEmbed({
                    title: `METAR Error | ${icaoArg.toUpperCase()}`,
                    description: makeLines([
                        `${icaoArg.toUpperCase()} is not a valid station code!`,
                    ]),
                });
            } else {
                // Unknown error
                metarEmbed = makeEmbed({
                    title: 'METAR Error',
                    description: makeLines([
                        'There was an unknown error with the METAR request!',
                    ]),
                });
            }

            await msg.channel.send({ embeds: [metarEmbed] });
        });
        return Promise.resolve();
    },
};
