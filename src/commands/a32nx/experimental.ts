import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const experimental: CommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const experimentalEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Experimental Version',
            description: makeLines([
                'Currently experimental is undergoing updates that can break the aircraft and is not 100% ready for public use. All previous features have been moved to our development version. Please see our [Experimental Version Support Page](https://docs.flybywiresim.com/fbw-a32nx/support/exp/) for more information. **No support will be offered via Discord.** ',
                '',
                'The Experimental version is a test version to find problems and issues and to improve functionality based on your feedback. It is not meant to be used for daily use or when you try to do a serious flight on an Online ATC service. ',
            ]),
        });

        await msg.channel.send({ embeds: [experimentalEmbed] });

    },
};
