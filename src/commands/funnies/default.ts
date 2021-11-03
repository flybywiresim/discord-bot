import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const DEFAULT_URL = 'https://tenor.com/view/airplane-fly-travel-happy-excited-gif-5686712';

export const defaultmeme: CommandDefinition = {
    name: 'default',
    description: 'O_o',
    category: CommandCategory.FUNNIES,
    executor: (msg) => msg.channel.send( DEFAULT_URL ),
};