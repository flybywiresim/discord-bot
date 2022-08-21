import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const CRAK_URL = 'https://media.discordapp.net/attachments/649309879575511063/913550403814166558/crak.png?width=840&height=203';

export const crak: CommandDefinition = {
    name: 'crak',
    description: 'What\'s your sim version?',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const crakEmbed = makeEmbed({ image: { url: CRAK_URL } });
        return msg.channel.send({ embeds: [crakEmbed] });
    },
};
