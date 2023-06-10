import fetch from 'node-fetch';
import { Colors } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory, Units } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';
import Logger from '../../lib/logger';

export const taf: CommandDefinition = {
    name: 'taf',
    description: 'Provides the TAF report of the requested airport',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.taf\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            const noQueryEmbed = makeEmbed({
                title: 'TAF Error | Missing Query',
                description: 'You must provide an airport ICAO code.',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [noQueryEmbed] });
            return Promise.resolve();
        }
        const icaoArg = splitUp[1];

        try {
            const tafReport = await fetch(`https://avwx.rest/api/taf/${icaoArg}`, {
                method: 'GET',
                headers: { Authorization: process.env.TAF_TOKEN },
            }).then((res) => res.json()) ;

            if (tafReport.error) {
                const invalidEmbed = makeEmbed({
                    title: `TAF Error | ${icaoArg.toUpperCase()}`,
                    description: tafReport.error,
                    color: Colors.Red,
                });
                await msg.reply({ embeds: [invalidEmbed] });
                return Promise.resolve();
            }

            const tafEmbed = makeEmbed({
                title: `TAF Report | ${tafReport.station}`,
                description: makeLines([
                    '**Raw Report**',
                    tafReport.raw,

                    '',
                    '**Basic Report:**',
                    `**Time Forecasted:** ${tafReport.time.dt}`,
                    `**Forecast start time:** ${tafReport.start_time.dt}`,
                    `**Forecast End Time:** ${tafReport.end_time.dt}`,
                    `**Visibility:** ${tafReport.forecast.visibility.repr}`,
 

                ]),
                fields: [
                    {
                        name: 'Unsure of how to read the raw report?',
                        value: 'Please refer to our guide [here.](https://docs.flybywiresim.com/pilots-corner/airliner-flying-guide/weather/#taf-example-decoded)',
                        inline: false,
                    },
                ],
                footer: { text: 'This TAF report is only a forecast, and may not accurately reflect weather in real life nor the simulator.' },
            });

            await replyWithEmbed(msg, tafEmbed);
        } catch (e) {
            Logger.error('taf:', e);
            const fetchErrorEmbed = makeEmbed({
                title: 'TAF Error | Fetch Error',
                description: 'There was an error fetching the TAF report. Please try again later.',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [fetchErrorEmbed] });
        }
        return Promise.resolve();
    },
};
