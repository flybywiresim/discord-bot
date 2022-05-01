import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const avatar: CommandDefinition = {
    name: ['avatar', 'av'],
    description: 'Shows the selected user\'s avatar',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const user = msg.mentions.users.first() || msg.author;
        user.displayAvatarURL({ dynamic: true });
        const avatarEmbed = makeEmbed({
            title: `${user.tag}'s Avatar`,
            image: { url: user.displayAvatarURL({ dynamic: true, size: 4096 }) },
        });
        return msg.channel.send({ embeds: [avatarEmbed] });
    },
};
