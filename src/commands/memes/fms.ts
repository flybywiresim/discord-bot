import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const FMS_URL = 'https://media.discordapp.net/attachments/897491699167793182/927340975725109329/unknown.png?width=673&height=676';

export const fms: CommandDefinition = {
    name: 'fms',
    description: 'That\'s how the real FMS draws it',
    category: CommandCategory.MEMES,
    executor: async (msg) => {
        const fmsEmbed = makeEmbed({ image: { url: FMS_URL } });
        await msg.channel.send({ embeds: [fmsEmbed] });
    },
};
