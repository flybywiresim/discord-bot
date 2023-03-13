import fetch from 'node-fetch';
import { Colors } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import Logger from '../../lib/logger';

const FBW_WEB_MAP_URL = 'https://flybywiresim.com/map';
const FBW_API_BASE_URL = 'https://api.flybywiresim.com';

export const flights: CommandDefinition = {
    name: ['liveflights', 'flights', 'flight'],
    description: 'Get the current live flights for FlyByWire Simulations.',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        try {
            const flights = await fetch(`${FBW_API_BASE_URL}/txcxn/_count`).then((res) => res.json());
            const flightsEmbed = makeEmbed({
                title: 'Live Flights',
                description: `There are currently **${flights}** active flights with TELEX enabled.`,
                footer: { text: 'Note: This includes the A32NX, and other aircraft using FlyByWire systems' },
                url: FBW_WEB_MAP_URL,
                timestamp: new Date().toISOString(),
            });
            return msg.reply({ embeds: [flightsEmbed] });
        } catch (e) {
            Logger.error(e);
            const errorEmbed = makeEmbed({
                title: 'Error | Live Flights',
                description: e.message,
                color: Colors.Red,
            });
            return msg.reply({ embeds: [errorEmbed] });
        }
    },
};
