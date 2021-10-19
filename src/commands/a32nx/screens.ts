import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SCREENS_HELP_URL = 'https://media.discordapp.net/attachments/885885609007276062/894955124399693844/unknown.png';

export const screens: CommandDefinition = {
    name: ['screens', 'screen'],
    description: 'Display help with avionics',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Screens Fix',
        description: makeLines([
            'Turn the following knobs to illuminate the dark screens.',
            '(Make sure to have batteries and Ground Power ON)',
        ]),
        image: { url: SCREENS_HELP_URL },
    })),
};
