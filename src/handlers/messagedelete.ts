import { Message, TextChannel } from 'discord.js';
import { EventHandlerDefinition } from '../lib/handler';
import { Channels, UserLogExclude } from '../constants';
import { makeEmbed } from '../lib/embed';

export const messageDeleted: EventHandlerDefinition<[Message]> = {
    event: 'messageDelete',
    executor: async (message) => {
        if (message.guild === null) {
            // DMs
            return;
        }

        const userLogsChannel = message.guild.channels.resolve(Channels.USER_LOGS) as TextChannel | null;

        if (!UserLogExclude.some((e) => e === message.author.id) && userLogsChannel !== null) {
            const deleteEmbed = makeEmbed({
                color: 'RED',
                thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
                author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    { name: 'Author', value: message.author, inline: true },
                    { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
                ],
                footer: { text: `User ID: ${message.author.id}` },
            });

            if (message.attachments.size > 0 && message.content) {
                deleteEmbed.fields[2] = { name: 'Deleted Message', value: message.content, inline: false };
                deleteEmbed.fields[3] = { name: 'Deleted Image', value: message.attachments.first().url, inline: false };
                await userLogsChannel.send(deleteEmbed);
            } else if (message.attachments.size > 0) {
                deleteEmbed.fields[2] = { name: 'Deleted Image', value: message.attachments.first().url, inline: false };
                await userLogsChannel.send(deleteEmbed);
            } else {
                deleteEmbed.fields[2] = { name: 'Deleted Message', value: message.content, inline: false };
                await userLogsChannel.send(deleteEmbed);
            }
        }
    },
};
