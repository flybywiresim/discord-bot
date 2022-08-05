import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const OIM_URL = 'https://cdn.discordapp.com/attachments/879400460891594772/931921828128120962/883969995053338644.gif';

export const oim: CommandDefinition = {
    name: 'oim',
    category: CommandCategory.MEMES,
    description: 'oim',
    executor: (msg) => msg.channel.send(OIM_URL),
};
