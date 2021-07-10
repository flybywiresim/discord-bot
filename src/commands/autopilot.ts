import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const autopilot: CommandDefinition = {
    name: ['autopilot', 'ap'],
    description: 'Provides a link to the autopilot/fly-by-wire page within docs',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Autopilot and fly-by-wire',
        description: 'Please see [this link](https://docs.flybywiresim.com/start/autopilot-fbw/) for a current list of reported issues and information on the autopilot/fly-by-wire systems.'
    })),
};