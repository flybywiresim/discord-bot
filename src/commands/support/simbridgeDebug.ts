import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const SIMBRIDGE_HELP_URL = `${imageBaseUrl}/support/simbridgeDebug.png`;

const simbridgeDebugEmbed = makeEmbed({
    title: 'FlyByWire Support | Why does SimBridge crash?',
    description: makeLines([
        'If SimBridge crashes moments after start, it could be due to bad installation of SimBridge, missing modules or another issue. In order to assist you further we will need to see your SimBridge logs.',
        '',
        '1. Open the folder where SimBridge is installed.',
        '2. Open a terminal window in that location (Hold `SHIFT` and right click on the empty space of the folder, then select "Open Windows Terminal", "Open Command Prompt", or "Open Powershell Window".',
        '3. Type `.\\fbw-simbridge.exe` and press enter.',
        '4. Screenshot the output of the console and send it to us.',
    ]),
    image: { url: SIMBRIDGE_HELP_URL },
    footer: { text: 'Tip: Click the image to view in full size' },
});

export const simbridgeDebug: MessageCommandDefinition = {
    name: ['simbridgedebug', 'sbdebug'],
    description: 'Provides instructions to debug SimBridge',
    category: CommandCategory.SUPPORT,
    genericEmbed: simbridgeDebugEmbed,
};
