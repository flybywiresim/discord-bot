import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const P3D_URL = 'https://cdn.discordapp.com/attachments/817470205260726322/962786021483905075/unknown.png';

export const p3d: CommandDefinition = {
    name: 'p3d',
    description: 'No!',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        await msg.channel.send(P3D_URL);
    },
};
