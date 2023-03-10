import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const weatherEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Weather Radar + Terrain Display',
    description: makeLines([
        'The A32NX does not have an operating weather radar as it is not currently possible to implement a high-fidelity A320 weather radar or weather map in MSFS.',
        '',
        'The terrain map (TERR on ND) is currently only available on the development + experimental versions via [SimBridge.](https://docs.flybywiresim.com/simbridge/)',
        '',
        'The team are currently waiting on a weather API to be implemented in order to make a radar that is as realistic as possible. You can read the MSFS forum [here.](https://forums.flightsimulator.com/t/implement-weather-and-terrain-api-s-for-aircraft-developers-to-implement-accurate-radar-predictive-windshear-egpws-and-metar-wind-uplink/442016)',
    ]),
});

export const weather: MessageCommandDefinition = {
    name: ['weather', 'wx'],
    description: 'Explains the current state of the weather and terrain radars in experimental',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: weatherEmbed,
};
