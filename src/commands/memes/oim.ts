import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const OIM_URL = `${process.env.IMAGE_BASE_URL}memes/oim.gif`;

export const oim: CommandDefinition = {
    name: 'oim',
    category: CommandCategory.MEMES,
    description: 'oim',
    executor: (msg) => msg.channel.send(OIM_URL),
};
