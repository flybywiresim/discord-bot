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
            if (message.attachments.size > 0 && message.content) {
                await userLogsChannel.send(makeEmbed({
                    color: 'RED',
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        { name: 'Author', value: message.author, inline: true },
                        { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
                        { name: 'Deleted message', value: message.content, inline: false },
                        { name: 'Deleted Image', value: message.attachments.first().url, inline: false },
                    ],
                    footer: { text: `User ID: ${message.author.id}` },
                }));
            } else if (message.attachments.size > 0) {
                await userLogsChannel.send(makeEmbed({
                    color: 'RED',
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        { name: 'Author', value: message.author, inline: true },
                        { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
                        { name: 'Deleted Image', value: message.attachments.first().url, inline: false },
                    ],
                    footer: { text: `User ID: ${message.author.id}` },
                }));
            } else {
                await userLogsChannel.send(makeEmbed({
                    color: 'RED',
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        { name: 'Author', value: message.author, inline: true },
                        { name: 'Channel', value: `<#${message.channel.id}>`, inline: false},
                        { name: 'Deleted Message', value: message.content, inline: false },
                    ]
                }))
            }
        }
    },
};
