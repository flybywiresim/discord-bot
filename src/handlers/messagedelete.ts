import { Colors, AuditLogEvent, TextChannel, Message } from 'discord.js';
import moment from 'moment';
import { Channels, UserLogExclude } from '../constants';
import { makeEmbed } from '../lib/embed';

const CONTENT_NOT_AVAIL = 'Unable to find content or embeds.';

module.exports = {
    event: 'messageDelete',
    executor: async (message: Message) => {
        if (message.guild === null) {
            // DMs
            return;
        }

        if (message.content === null) {
            // Old Message
            return;
        }

        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageDelete,
        });
        const deletionLog = fetchedLogs.entries.first();
        const currentDate = new Date();
        const formattedDate: string = moment(currentDate).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');
        const userLogsChannel = message.guild.channels.resolve(Channels.USER_LOGS) as TextChannel | null;
        const messageEmbeds = message.embeds.length > 0 ? message.embeds : [];
        const messageComponents = [];
        if (message.content) {
            messageComponents.push(message.content);
        }
        if (message.attachments) {
            message.attachments.forEach((attachment) => {
                if (attachment.url || attachment.proxyURL) {
                    messageComponents.push(attachment.url ? attachment.url : attachment.proxyURL);
                }
            });
        }
        for (let i = 0; i < messageEmbeds.length; i++) {
            const messageEmbed = messageEmbeds[i];
            const { image, fields } = messageEmbed;
            if (image) {
                messageComponents.push(`<${image.url}>`);
            }
            for (let j = 0; j < fields.length; j++) {
                const field = fields[i];
                const { name, value } = field;
                if (name && value) {
                    messageComponents.push(`${name}: ${value}`);
                }
            }
        }
        const messageContent = messageComponents.join('\n');
        const messageReference = message.reference ? await message.fetchReference() : null;
        const messageDeleteEmbed = makeEmbed({
            color: Colors.Red,
            thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
            author: {
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL(),
            },
            fields: [
                {
                    name: 'Date',
                    value: formattedDate,
                    inline: true,
                },
                {
                    name: 'Author',
                    value: `${message.author}`,
                    inline: true,
                },
                {
                    name: 'Channel',
                    value: `${message.channel}`,
                    inline: true,
                },
                {
                    name: 'Reply to',
                    value: messageReference ? `${messageReference.url}` : 'None',
                    inline: true,
                },
                {
                    name: 'Deleted by',
                    value: (deletionLog && deletionLog.target.id === message.author.id) ? `${deletionLog.executor}` : 'No audit log was found, message was either deleted by author, or a bot',
                    inline: false,
                },
                {
                    name: 'Deleted Message',
                    value: messageContent ? `${messageContent}` : CONTENT_NOT_AVAIL,
                    inline: false,
                },
            ],
            footer: { text: `User ID: ${message.author.id}` },
        });

        if (userLogsChannel && !UserLogExclude.some((e) => e === message.author.id)) {
            await userLogsChannel.send({ embeds: [messageDeleteEmbed] });
        }
    },
};
