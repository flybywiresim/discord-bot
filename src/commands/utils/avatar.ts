import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const avatar: CommandDefinition = {
    name: ['avatar', 'av'],
    description: 'Shows the selected user\'s avatar',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        const split = msg.content.replace(/(?:\.av|\.avatar)\s+/, '').split(' ');
        const userID = msg.guild.members.cache.get(split[0]);
        const user = msg.mentions.users.first() || userID || msg.author;
        user.displayAvatarURL();
        const avatarEmbed = makeEmbed({ image: { url: user.displayAvatarURL({ size: 4096 }) } });
        if (user === msg.mentions.users.first()) {
            avatarEmbed.data.title = `${user.tag}'s avatar`;
        } else if (user === msg.author) {
            avatarEmbed.data.title = `${msg.author.tag}'s avatar`;
        } else if (user === userID) {
            avatarEmbed.data.title = `${userID.user.tag}'s avatar`;
        }
        return msg.reply({ embeds: [avatarEmbed] });
    },
};
