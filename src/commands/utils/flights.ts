import request from 'request';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import Logger from '../../lib/logger';

export const flights: CommandDefinition = {
    name: ['flights', 'liveflights', 'stats'],
    description: 'Gets the flights of FlyByWire Simulations',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        request({
            method: 'GET',
            url: 'https://api.flybywiresim.com/txcxn/_count',
        }, async (error, response, body) => {
            if (response.statusCode === 200) {
                const stats = JSON.parse(body);
                const statsEmbed = makeEmbed({
                    title: 'Current Flights',
                    description: `**${stats}** flights`,
                    timestamp: new Date(),
                });
                await msg.channel.send({ embeds: [statsEmbed] });
            } else {
                const errorEmbed = makeEmbed({
                    title: 'Error - Current Flights',
                    description: `\`\`\`${error}\`\`\``,
                    color: 'RED',
                });
                Logger.error(error);
                await msg.channel.send({ embeds: [errorEmbed] });
            }
        });

        return Promise.resolve();
    },
};
