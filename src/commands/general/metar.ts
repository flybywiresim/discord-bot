import axios from 'axios'
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

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
        return axios.get('https://api.checkwx.com/bot/metar/' + icaoArg + '?x-api-key=568fd8d087854c8298d4acbccf')
            .then((resp) => {
                const report = resp.data.toString();
                const reportICAO = report.split(' ');
                msg.channel.send(makeEmbed({
                    title: 'METAR Report | ' + reportICAO[0],
                    description: report,
                    fields: [
                        { name: 'Unsure of how to read this?', value: 'please refer to our guide [here.](https://docs.flybywiresim.com/pilots-corner/airliner-flying-guide/weather/)', inline: false },
                    ],
                }));
            });
    },
};
