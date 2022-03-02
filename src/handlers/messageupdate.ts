import { Message, TextChannel } from 'discord.js';
import { EventHandlerDefinition } from '../lib/handler';
import { Channels, UserLogExclude } from '../constants';
import { makeEmbed } from '../lib/embed';

const FEATURE_NOT_AVAIL = '(can\'t show embeds or images)';

export const messageUpdated: EventHandlerDefinition<[Message, Message]> = {
    event: 'messageUpdate',
    executor: async (oldMessage, newMessage) => {
        const userLogsChannel = oldMessage.guild.channels.resolve(Channels.USER_LOGS) as TextChannel;

        if (!UserLogExclude.some((e) => e == oldMessage.author.id)) {
            userLogsChannel.send(makeEmbed({
                color: 'ORANGE',
                thumbnail: {
                    url: `https://cdn.discordapp.com/attachments/770835189419999262/779963227589050378/edit-message-pngrepo-com.png`
                },
                author: {
                    name: oldMessage.author.tag,
                    icon_url: oldMessage.author.displayAvatarURL({ dynamic: true })
                },
                fields: [
                    { name: 'Author', value: oldMessage.author, inline: true },
                    { name: 'Channel', value: `<#${oldMessage.channel.id}>`, inline: true },
                    { name: 'Original Message', value: oldMessage.content ? `\`\`\`${oldMessage.content}\`\`\`` : FEATURE_NOT_AVAIL, inline: false },
                    { name: 'Edited Message', value: newMessage.content ? `\`\`\`${newMessage.content}\`\`\`` : FEATURE_NOT_AVAIL, inline: false },
                ],
                footer: {
                    text: `User ID: ${oldMessage.author.id}`,
                },
            }));
        }
    },
};
