import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const WEB_URL = 'https://flybywiresim.com/';

export const website: CommandDefinition = {
    name: ['website', 'web'],
    description: 'Links to the FlyByWire Simulations website.',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send(WEB_URL),
};
