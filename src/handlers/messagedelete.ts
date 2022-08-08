import { Colors, TextChannel } from 'discord.js';
import { Channels, UserLogExclude } from '../constants';
import { makeEmbed } from '../lib/embed';

const FEATURE_NOT_AVAIL = '(can\'t show embeds or images)';

module.exports = {
    event: 'messageDelete',
    executor: async (message) => {
        if (message.guild === null) {
            // DMs
            return;
        }

        if (message.content === null) {
            // Old Message
            return;
        }

        const userLogsChannel = message.guild.channels.resolve(Channels.USER_LOGS) as TextChannel | null;

        if (userLogsChannel && !UserLogExclude.some((e) => e === message.author.id)) {
            const messageDeleteEmbed = makeEmbed({
                color: Colors.Red,
                thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    { name: 'Author', value: `${message.author}`, inline: true },
                    { name: 'Channel', value: `${message.channel}`, inline: true },
                    { name: 'Deleted Message', value: message.content ? `${message.content}` : FEATURE_NOT_AVAIL, inline: false },
                ],
                footer: { text: `User ID: ${message.author.id}` },
            });
            await userLogsChannel.send({ embeds: [messageDeleteEmbed] });
        }
    },
};
