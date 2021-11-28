import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const experimental: CommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Experimental Version',
        description: 'Our custom FMS has been moved into the development branch and Experimental is now temporarily on hold. Please switch to our development branch to continue using this feature with the latest updates. '
                + 'Our [Experimental Version Support Page](https://docs.flybywiresim.com/fbw-a32nx/support/exp/) will be updated when we start working on new features in the experimental branch. '
                + 'No support will be offered via Discord for Experimental. ',
    })),
};
