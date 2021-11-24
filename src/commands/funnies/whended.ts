import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const WHENDED_URL = 'https://cdn.discordapp.com/attachments/740722295009706034/912043650601586769/dot_when.mov';

export const wheneded: CommandDefinition = {
    name: 'whended',
    description: 'A wild .whened appears!',
    category: CommandCategory.FUNNIES,
    executor: (msg) => msg.channel.send(WHENDED_URL),
};
