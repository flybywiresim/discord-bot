import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const MANUAL_URL = 'https://cdn.discordapp.com/attachments/752801628347957248/914937996514570300/FBWanim2_1.gif';

export const manual: CommandDefinition = {
    name: 'manual',
    description: 'Displays image about manual waypoints',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({ image: { url: MANUAL_URL } })),
};
