import { CommandDefinition } from '../lib/command';
import { makeEmbed, makeLines } from '../lib/embed';
import { CommandCategory } from '../constants';

const CHECKLIST_URL = 'https://cdn.discordapp.com/attachments/770835189419999262/813173873264033812/Screenshot_306.png';

export const checklist: CommandDefinition = {
    name: 'checklist',
    description: 'Displays the checklist',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Checklist',
        description: makeLines([
            'Click the title for a better quality picture',
        ]),
        image: { url: CHECKLIST_URL },
    })),
};