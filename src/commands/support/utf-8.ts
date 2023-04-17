import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const UTF8_HELP_URL = `${imageBaseUrl}/support/utf-8.PNG`;

const utf8Embed = makeEmbed({
    title: 'FlyByWire A32NX | UTF-8',
    description: makeLines([
        'Some users experience problems with various systems in the A32NX. These are caused by an issue within MSFS which requires the use of the UTF-8 Region setting in Windows.',
        '',
        'To enable UTF-8 support follow the steps below:',
        '',
        '• Open Windows Control Panel -> Region.',
        '',
        '• Go to the Administrative tab and click Change system locale.',
        '',
        '• Make sure the check mark next to Beta: Use UTF-8 for worldwide language support is selected.',
        '',
        '• Click OK and restart your computer.',
        '',
        'Please see our [documentation](https://docs.flybywiresim.com/fbw-a32nx/settings/#utf-8-support) for more information.',
    ]),
    image: { url: UTF8_HELP_URL },
});

export const utf8: MessageCommandDefinition = {
    name: 'utf8',
    description: 'Provides a link to resolve UTF-8 issues',
    category: CommandCategory.SUPPORT,
    genericEmbed: utf8Embed,
};
