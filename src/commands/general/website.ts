import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

const WEBSITE_URL = 'https://flybywiresim.com/';

export const website: CommandDefinition = {
    name: ['website', 'web'],
    description: 'Links to the FlyByWire Simulations website.',
    category: CommandCategory.GENERAL,
    executor: (msg) => replyWithMsg(msg, WEBSITE_URL),
};
