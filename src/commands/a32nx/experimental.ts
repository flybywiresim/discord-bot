import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const experimental: CommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Experimental Version',
        description: 'We are currently testing updates to our custom FMS LNAV, and other additional improvements. Please see our [Experimental Version Support Page](https://docs.flybywiresim.com/fbw-a32nx/support/exp/) for more information. **No support will be offered via Discord.** '
                + 'The Experimental version is a test version to find problems and issues and to improve functionality based on your feedback. It is not meant to be used for daily use or when you try to do a serious flight on an Online ATC service. '
    })),
};
