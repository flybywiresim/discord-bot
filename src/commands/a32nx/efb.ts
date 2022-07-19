import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const EFB_URL = 'https://cdn.discordapp.com/attachments/897491699167793182/998837392226131968/efb75-35.gif';

export const efb: CommandDefinition = {
    name: 'efb',
    description: 'Inquire about the state of the EFB',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const efbEmbed = makeEmbed({ image: { url: EFB_URL } });

        await msg.channel.send({ embeds: [efbEmbed] });
    },
};
