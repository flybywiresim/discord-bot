import request from 'request'
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const metar: CommandDefinition = {
    name: 'metar',
    description: 'Provides the METAR report of the requested airport',
    category: CommandCategory.FBW,
    executor: (msg) => {
        const splitUp = msg.content.replace(/\.metar\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            msg.reply('please provide an ICAO airport code.');
            return Promise.resolve();
        }
        const icaoArg = splitUp[1];
        request({
            method: 'GET',
            url: `https://avwx.rest/api/metar/${icaoArg}`,
            headers: {
                Authorization: 'N7GPU-i5a-RTWDHQhK5uAeI1sBlQSB5iyYGDfJMt3G0' },
        }, (error, response, body) => {
            const metars = JSON.parse(body);
            msg.channel.send(makeEmbed({
                title: `METAR Report | ${metars.station}`,
                description: makeLines([
                    '**Raw Report**',
                    metars.raw,
                    ,
                    '**Basic Report:**',
                    `**Station**: ${metars.station}`,
                    `**Wind**: ${metars.wind_direction.repr} at ${metars.wind_speed.repr}kts`,
                    `**Visibility**: ${metars.visibility.repr} meters`,
                    `**Temperature**: ${metars.temperature.repr}C`,
                    `**Dew Point**: ${metars.dewpoint.repr}C`,
                    `**Altimeter**: ${metars.altimeter.repr}`,
                ]),
                fields: [
                    { name: 'Unsure of how to read the raw report?', value: 'Please refer to our guide [here.](https://docs.flybywiresim.com/pilots-corner/airliner-flying-guide/weather/)', inline: false },
                ],
            }));
        });
    },
};
