import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';

const P3D_URL = `${imageBaseUrl}/memes/p3d.png`;

export const p3d: CommandDefinition = {
    name: 'p3d',
    description: 'No!',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(P3D_URL),
};
