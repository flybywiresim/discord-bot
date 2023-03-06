import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const buildEmbed = makeEmbed({
    title: 'FlyByWire Support | Build Info',
    description: makeLines([
        'Please send us your build info!',
        '',
        'Navigate to your Community folder and open the following A32NX file with Notepad:',
        '',
        '`\\flybywire-aircraft-a320-neo\\build_info.json`',
        '',
        'Please send the contents of this file.',
        '',
        'More information can be found [here.](https://docs.flybywiresim.com/fbw-a32nx/support/#build-info)',
    ]),
});

export const build: MessageCommandDefinition = {
    name: ['build', 'build info', 'buildinfo'],
    description: 'Link to docs for build info',
    category: CommandCategory.SUPPORT,
    genericEmbed: buildEmbed,
};
