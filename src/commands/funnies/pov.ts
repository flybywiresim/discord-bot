import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const POV_URL = 'https://media.discordapp.net/attachments/472202095639134241/791670309719113758/ezgif-3-22ae8bd0d539.gif';

export const pov: CommandDefinition = {
    name: 'pov',
    description: 'Oof',
    category: CommandCategory.FUNNIES,
    executor: (msg) => msg.channel.send( POV_URL ),
};