import { MessageCommandDefinition } from '../../lib/command';
import { Channels, CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const experimentalEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Experimental Version',
    description: makeLines([
        'Currently, experimental is geared toward testing the initial version of VNAV with additional features added at the development team\'s discretion. Please see our [Experimental Version Support Page](https://docs.flybywiresim.com/exp/) for more information. **Do not expect support for the experimental version - use at own risk!**',
        '',
        'Please use the appropriate discord channel or forum to discuss any issues:',
        `<#${Channels.EXP_CFMS_ISSUES}>`,
        '',
        'The Experimental version is a test version to find problems, issues and to improve functionality based on your feedback. It is not meant to be used for daily use or serious flights with an Online ATC service.',
    ]),
});

export const experimental: MessageCommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: experimentalEmbed,
};
