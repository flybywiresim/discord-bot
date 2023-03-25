import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';

const OIM_URL = `${imageBaseUrl}/memes/oim.gif`;

export const oim: CommandDefinition = {
    name: 'oim',
    category: CommandCategory.MEMES,
    description: 'oim',
    executor: (msg) => msg.channel.send(OIM_URL),
};
