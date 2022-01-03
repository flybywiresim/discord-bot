import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const MANUAL_URL = 'https://cdn.discordapp.com/attachments/785976111875751956/927657411764969612/unknown.png';

export const manual: CommandDefinition = {
    name: 'manual',
    description: 'Displays image about manual waypoints',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({ 
        title: 'FlyByWire Support | Manual Leg Diagram',
        image: { url: MANUAL_URL } })),
};
