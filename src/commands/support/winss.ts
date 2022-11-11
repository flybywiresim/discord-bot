import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SNIPPING_TOOL_URL = 'https://media.discordapp.net/attachments/897491699167793182/1040649316672479232/image.png';

export const winss: CommandDefinition = {
    name: ['winss', 'sswin'],
    description: 'Explains how to screenshot on Windows',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const winssEmbed = makeEmbed({
            title: 'How to screenshot on Windows',
            description: makeLines([
                '1. Press `Win + Shift + S` to start taking a screenshot.',
                '2. Press and drag to make a rectangle selection of everything you want to include in the screenshot.',
                '3. Release the mouse to finish the selection.',
                '4. The screenshot is saved into your clipboard. Paste it in chat with `Ctrl + V`.',
                '',
                'Alternatively, you can use the Snipping Tool. Click \'New\' and follow steps 2 - 4.'
            ]),
            image: { url: SNIPPING_TOOL_URL },
        });

        return msg.channel.send({ embeds: [winssEmbed] });
    },
};