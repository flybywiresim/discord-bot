import { Colors, TextChannel } from 'discord.js';
import { Channels, UserLogExclude } from '../constants';
import { makeEmbed } from '../lib/embed';

const FEATURE_NOT_AVAIL = '(can\'t show embeds or images)';

module.exports = {
    event: 'messageUpdate',
    executor: async (oldMessage, newMessage) => {
        if (oldMessage.guild === null) {
            // DMs
            return;
        }

        if (oldMessage.content === null) {
            // Old Message
            return;
        }

        const userLogsChannel = oldMessage.guild.channels.resolve(Channels.USER_LOGS) as TextChannel | null;

        if (userLogsChannel && !UserLogExclude.some((e) => e === oldMessage.author.id)) {
            const messageUpdateEmbed = makeEmbed({
                color: Colors.Orange,
                thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779963227589050378/edit-message-pngrepo-com.png' },
                author: {
                    name: oldMessage.author.tag,
                    iconURL: oldMessage.author.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    { name: 'Author', value: `${oldMessage.author}`, inline: true },
                    { name: 'Channel', value: `${oldMessage.channel}`, inline: true },
                    { name: 'Original Message', value: oldMessage.content ? `\`\`\`${oldMessage.content}\`\`\`` : FEATURE_NOT_AVAIL, inline: false },
                    { name: 'Edited Message', value: newMessage.content ? `\`\`\`${newMessage.content}\`\`\`` : FEATURE_NOT_AVAIL, inline: false },
                ],
                footer: { text: `User ID: ${oldMessage.author.id}` },
            });
            await userLogsChannel.send({ embeds: [messageUpdateEmbed] });
        }
    },
};
