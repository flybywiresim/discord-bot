import { CommandDefinition } from '../lib/command';
import { makeEmbed, makeLines } from '../lib/embed';
import { CommandCategory } from '../constants';

const SCREENS_HELP_URL = 'https://cdn.discordapp.com/attachments/738864300818432023/750409540918444072/A320_screens.png';

export const screens: CommandDefinition = {
    name: ['screens', 'screen'],
    description: 'Display help with avionics',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Screens Fix',
        description: makeLines([
            'Turn the following buttons to illuminate the dark screens.',
            '(Make sure to have batteries and Ground Power ON)',
        ]),
        image: { url: SCREENS_HELP_URL },
    })),
};
