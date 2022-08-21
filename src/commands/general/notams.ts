import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const WEB_BASE_URL = 'https://flybywiresim.com';

export const notams: CommandDefinition = {
    name: ['notams', 'notam', 'news'],
    description: 'Links to the FlyByWire Simulations NOTAMS.',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send(`${WEB_BASE_URL}/notams`),
};
