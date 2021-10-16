import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const pfd: CommandDefinition = {
    name: ['pfd', 'pfdguide'],
    description: 'Links to PFD guide in docs',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Primary Flight Display',
        description: 'Please click [here](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/pfd/) for a clickable version of the A32NX Primary Flight Display (PFD), and in depth guide on the different sections of this display.',
        })),
};
