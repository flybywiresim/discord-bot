import { CommandDefinition } from '../../lib/command';

const WEB_URL = 'https://flybywiresim.com/';

export const website: CommandDefinition = {
    name: ['website', 'web'],
    description: 'Links to the FlyByWire Simulations website.',
    executor: (msg) => msg.channel.send(WEB_URL),
};
