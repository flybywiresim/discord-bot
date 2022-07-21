import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const MICO_URL = 'https://cdn.discordapp.com/attachments/897491699167793182/961770149252313098/Screenshot_2022-04-07_223914.png';

export const mico: CommandDefinition = {
    name: 'mico',
    description: 'mico!',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        await msg.channel.send(MICO_URL);
    },
};
