import { Colors, AuditLogEvent, TextChannel } from 'discord.js';
import moment from 'moment';
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

        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageDelete,
        });

        const deletionLog = fetchedLogs.entries.first();

        const currentDate = new Date();
        const formattedDate: string = moment(currentDate).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');

        const userLogsChannel = message.guild.channels.resolve(Channels.USER_LOGS) as TextChannel | null;

        const messageDeleteEmbedNoLog = (formattedDate) => makeEmbed({
            color: Colors.Red,
            thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
            author: {
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            },
            fields: [
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
                    name: 'Deleted by',
                    value: 'No audit log was found, message was either deleted by author, or a bot',
                    inline: false,
                },
                {
                    name: 'Deleted Message',
                    value: message.content ? `${message.content}` : FEATURE_NOT_AVAIL,
                    inline: false,
                },
                { name: 'Date', value: formattedDate, inline: false },
            ],
            footer: { text: `User ID: ${message.author.id}` },
        });

        const messageDeleteEmbed = (executor, formattedDate) => makeEmbed({
            color: Colors.Red,
            thumbnail: { url: 'https://cdn.discordapp.com/attachments/770835189419999262/779946282373873694/150-1509174_deleted-message-icon-sign-hd-png-download.png' },
            author: {
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            },
            fields: [
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
                    name: 'Deleted by',
                    value: `${executor}`,
                    inline: false,
                },
                {
                    name: 'Deleted Message',
                    value: message.content ? `${message.content}` : FEATURE_NOT_AVAIL,
                    inline: false,
                },
                { name: 'Date', value: formattedDate, inline: false },
            ],
            footer: { text: `User ID: ${message.author.id}` },
        });

        if (userLogsChannel && !UserLogExclude.some((e) => e === message.author.id)) {
            if (!deletionLog) await userLogsChannel.send({ embeds: [messageDeleteEmbedNoLog(formattedDate)] });

            const { executor, target } = deletionLog;

            if (target.id === message.author.id) {
                await userLogsChannel.send({ embeds: [messageDeleteEmbed(executor, formattedDate)] });
            } else {
                await userLogsChannel.send({ embeds: [messageDeleteEmbedNoLog(formattedDate)] });
            }
        }
    },
};
