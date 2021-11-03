import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const JAUN_URL = 'https://cdn.discordapp.com/attachments/740722295009706034/775255132949577748/maxresdefault.png';

export const juan: CommandDefinition = {
    name: 'juan',
    description: 'just... Jaun',
    category: CommandCategory.FUNNIES,
    executor: (msg) => msg.channel.send( JAUN_URL ),
};