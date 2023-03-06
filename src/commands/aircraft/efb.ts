import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const EFB_URL = `${process.env.IMAGE_BASE_URL}a32nx/efb.gif`;

export const efb: CommandDefinition = {
    name: 'efb',
    description: 'Inquire about the state of the EFB',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const efbEmbed = makeEmbed({ image: { url: EFB_URL } });

        return msg.channel.send({ embeds: [efbEmbed] });
    },
};
