import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const FMS_URL = `${process.env.IMAGE_BASE_URL}memes/fms.png`;

export const fms: CommandDefinition = {
    name: 'fms',
    description: 'That\'s how the real FMS draws it',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const fmsEmbed = makeEmbed({ image: { url: FMS_URL } });
        return msg.channel.send({ embeds: [fmsEmbed] });
    },
};
