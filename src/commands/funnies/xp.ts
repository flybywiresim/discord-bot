import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const XP_URL = 'https://tenor.com/view/austin-meyer-austin-slap-annoyed-xplane-gif-17303677';

export const xp: CommandDefinition = {
    name: ['xp', 'XPlane', 'X-Plane'],
    description: 'Just... no!',
    category: CommandCategory.FUNNIES,
    executor: (msg) => msg.channel.send( XP_URL ),
};