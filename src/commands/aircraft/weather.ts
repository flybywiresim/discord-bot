import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const genericWeatherEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Weather Radar + Terrain Display',
    description: makeLines([
        'The A32NX does not have operating weather radar. This is due to performance issues related to the default Asobo systems and implementing a custom ND in our aircraft.',
        '',
        'Terrain display is currently only available on the development + experimental version via [SimBridge.](https://docs.flybywiresim.com/simbridge/)',
        '',
        'The team are currently waiting on a weather API to be implemented in order to make a radar that is as realistic as possible. You can read the MSFS forum [here.](https://forums.flightsimulator.com/t/implement-weather-and-terrain-api-s-for-aircraft-developers-to-implement-accurate-radar-predictive-windshear-egpws-and-metar-wind-uplink/442016)',
    ]),
});

export const weather: MessageCommandDefinition = {
    name: ['weather', 'wx'],
    description: 'Explains the current state of the weather and terrain radars in experimental',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: genericWeatherEmbed,
};
