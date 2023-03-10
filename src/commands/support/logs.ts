import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const logsEmbed = makeEmbed({
    title: 'FlyByWire Support | Installer Logs',
    description: makeLines([
        'If you encounter an error with the installer, please send a copy of the installer log here in <#785976111875751956> To do this:',
        '',
        '1. Open the debug tool with ^Ctrl + F12',
        '2. Find and select \'Console\' in the top menu',
        '3. Right click anywhere in the log displayed',
        '4. Click \'Save as\' and send the log to us',
    ]),
});

export const logs: MessageCommandDefinition = {
    name: ['installerlogs', 'logs'],
    description: 'Provides an explanation on how to receive installer error logs for support',
    category: CommandCategory.SUPPORT,
    genericEmbed: logsEmbed,
};
