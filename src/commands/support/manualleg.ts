import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const MANUAL_URL = 'https://cdn.discordapp.com/attachments/752801628347957248/929071827752480839/mcdu-discontinuity-manual-conceptual.png';

export const manualleg: CommandDefinition = {
    name: ['manualleg','vm'],
    description: 'Displays image about manual waypoints',
    category: CommandCategory.SUPPORT,
    executor: (msg) => msg.channel.send(makeEmbed({ 
        title: 'FlyByWire Support | Manual Leg Diagram',
        image: { url: MANUAL_URL },
     })),
};
