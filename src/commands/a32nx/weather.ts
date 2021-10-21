import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const weather: CommandDefinition = {
    name: ['weather', 'wx'],
    description: 'Explains the current state of the weather and terrain radars in experimental',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Weather + Terrain Radars',
        description: 'The experimental version of the A32NX does not have operating weather and terrain radars. This is due to the lack of realism in the default radars. The team is currently waiting for Asobo to implement weather and terrain API\'s in order to create a true to life radar system. You can read the MSFS forum thread [here.](https://forums.flightsimulator.com/t/implement-weather-and-terrain-api-s-for-aircraft-developers-to-implement-accurate-radar-predictive-windshear-egpws-and-metar-wind-uplink/442016)',
    })),
};
