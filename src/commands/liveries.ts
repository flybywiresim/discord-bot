import {CommandDefinition} from '../lib/command';
import {CommandCategory} from '../constants';
import { makeEmbed } from '../lib/embed';

export const liveries: CommandDefinition = {
    name: ['liveries', 'liv'],
    description: 'Provides a link to the flightsim.to A32NX liveries page',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'A32NX Liveries',
        description: 'Download liveries for the A32NX from [this link](https://flightsim.to/c/liveries/flybywire-a32nx/). Just unzip the .zip and place the contents of the file in your community folder.',
    })),
};
