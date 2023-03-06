import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const cursorEmbed = makeEmbed({
    title: 'FlyByWire A32NX | EFB Focus',
    description: makeLines([
        'In certain situations, if you have selected an input field on the EFB and changed your view away from the EFB, you may no longer have use of your mouse cursor.',
        '',
        'Please follow the steps below to bypass this issue:',
        '',
        '1. Open your browser (i.e. Chrome / Firefox)',
        '2. In the URL field type in - `localhost:19999`',
        '3. Click on any link',
        '4. Go to the `Console Tab` shown in the browser. (**Note:** This is not the devtools of your browser. The page you are on already has a console tab at the top.)',
        '5. At the bottom type in - `Coherent.call(\'UNFOCUS_INPUT_FIELD\')`',
        '6. Press `enter`',
    ]),
    footer: { text: 'Affected versions: Stable, Development' },
});

export const cursor: MessageCommandDefinition = {
    name: ['cursor', 'efbfocus', 'unfocus'],
    description: 'Displays steps to help with EFB cursor focus issue',
    category: CommandCategory.SUPPORT,
    genericEmbed: cursorEmbed,
};
