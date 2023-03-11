import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const P3D_URL = `${process.env.IMAGE_BASE_URL}memes/p3d.png`;

export const p3d: CommandDefinition = {
    name: 'p3d',
    description: 'No!',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(P3D_URL),
};
