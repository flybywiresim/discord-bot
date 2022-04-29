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
                'Currently experimental is geared toward testing the initial version of VNAV and flyPadOS3. Please see our [Experimental Version Support Page](https://docs.flybywiresim.com/fbw-a32nx/support/exp/) for more information. **No support will be offered via Discord.** ',
                '',
                'Please use the appropriate discord thread to discuss any issues: ',
                '- <#926586416820011098> ',
                '- <#957208413887139860> ',
                '- <#965072479796215888> ',
                '',
                'The Experimental version is a test version to find problems, issues and to improve functionality based on your feedback. It is not meant to be used for daily use or serious flights with an Online ATC service. ',
            ]),
        });

        await msg.channel.send({ embeds: [experimentalEmbed] });
    },
};
