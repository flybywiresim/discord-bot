import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const SNIPPING_TOOL_URL = `${imageBaseUrl}/support/winss.png`;

const winssEmbed = makeEmbed({
    title: 'FlyByWire Support | How to screenshot on Windows',
    description: makeLines([
        '1. Press `Win + Shift + S` to start taking a screenshot.',
        '2. Press and drag to make a rectangle selection of everything you want to include in the screenshot.',
        '3. Release the mouse to finish the selection.',
        '4. The screenshot is saved into your clipboard. Paste it in chat with `Ctrl + V`.',
        '',
        'Alternatively, you can use the Snipping Tool. Click \'New\' and follow steps 2 - 4.',
    ]),
    image: { url: SNIPPING_TOOL_URL },
});

export const winss: MessageCommandDefinition = {
    name: ['winss', 'sswin', 'howtoss'],
    description: 'Explains how to screenshot on Windows',
    category: CommandCategory.SUPPORT,
    genericEmbed: winssEmbed,
};
