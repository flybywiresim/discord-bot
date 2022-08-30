import { Colors, EmbedField, TextChannel } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { Roles, Channels, CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { getConn } from '../../lib/db';
import StickyMessage from '../../lib/schemas/stickyMessageSchema';
import { stickyMessageEmbed } from '../../lib/stickyEmbed';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];
const DEFAULT_TIME_INTERVAL = 15;
const DEFAULT_MESSAGE_COUNT = 5;
const MAX_TIME_INTERVAL = 86400;
const MAX_MESSAGE_COUNT = 50;
const MIN_TIME_INTERVAL = 15;
const MIN_MESSAGE_COUNT = 5;

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Manage Sticky Messages - Help',
    description: 'A command to set and manage sticky messages for channels.',
    fields: [
        {
            name: `Setting a sticky message: \`${evokedCommand} set <message>\``,
            value: 'Sets the provided message as a sticky message for the channel in which the command is executed. A message can contain new lines and simple Markdown elements.',
            inline: false,
        },
        {
            name: `Setting the minimum message count: \`${evokedCommand} count <number>\``,
            value: 'If neither the minimum message count have been posted in the channel or the minimum time interval has passed, the sticky will not be posted. This prevents spamming a channel.',
            inline: false,
        },
        {
            name: `Setting the minimum time interval: \`${evokedCommand} time <seconds>\``,
            value: 'If neither the minimum message count have been posted in the channel or the minimum time interval has passed, the sticky will not be posted. This prevents spamming a channel.',
            inline: false,
        },
        {
            name: `Removing a sticky message: \`${evokedCommand} unset\``,
            value: 'Removes the configured sticky message from the channel and stop posting it.',
            inline: false,
        },
        {
            name: `Showing info about a sticky message: \`${evokedCommand} info <channel ID>\``,
            value: 'Shows all the information available for a configured sticky message for a channel.',
            inline: false,
        },
    ],
});

const infoEmbed = (fields: EmbedField[]) => makeEmbed({
    title: 'Sticky Message - Info',
    fields,
});

const failedEmbed = (action: string, channel: string) => makeEmbed({
    title: `Sticky Message - ${action} failed`,
    description: `Failed to ${action} the sticky message for channel <#${channel}>, change not saved to mongoDB.`,
    color: Colors.Red,
});

const channelEmbed = (action: string, fields: any, color: number) => makeEmbed({
    title: `Sticky Message - ${action}`,
    fields,
    color,
});

const missingInfoEmbed = (action: string, information: string) => makeEmbed({
    title: `Sticky Message - ${action} - missing information`,
    description: `${information}`,
    color: Colors.Red,
});

const noChannelEmbed = (action:string, channelName: string) => makeEmbed({
    title: `Sticky Message - ${action} - No ${channelName} channel`,
    description: `The command was successful, but no message to ${channelName} was sent. Please check the channel still exists.`,
    color: Colors.Yellow,
});

const noConnEmbed = makeEmbed({
    title: 'Sticky Message - No Connection',
    description: 'Could not connect to the database.',
    color: Colors.Red,
});

const noPermEmbed = makeEmbed({
    title: 'Sticky Message - Permission missing',
    description: 'You do not have permission to use this command.',
    color: Colors.Red,
});

const notFoundEmbed = (action: string, channel: string) => makeEmbed({
    title: `Sticky Message - ${action} - Not found`,
    description: `No Sticky Message for <#${channel}> was found.`,
    color: Colors.Red,
});

const stickyMessageEmbedField = (updatedDate: string, moderator: string, message: string, timeInterval: string, messageCount: string, channel: string): EmbedField[] => [
    {
        inline: true,
        name: 'Channel',
        value: `<#${channel}>`,
    },
    {
        inline: true,
        name: 'Moderator',
        value: moderator,
    },
    {
        inline: true,
        name: 'Last updated date',
        value: updatedDate,
    },
    {
        inline: true,
        name: 'Minimum time interval',
        value: timeInterval,
    },
    {
        inline: true,
        name: 'Minimum message count',
        value: messageCount,
    },
    {
        inline: false,
        name: 'Message',
        value: message,
    },
];

export const sticky: CommandDefinition = {
    name: ['sticky'],
    description: 'Manages sticky messages.',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const subCommands = ['set', 'count', 'time', 'unset', 'info'];
        const conn = getConn();
        if (!conn) {
            return msg.channel.send({ embeds: [noConnEmbed] });
        }

        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));
        if (!hasPermittedRole) {
            return msg.channel.send({ embeds: [noPermEmbed] });
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const { channelId, author } = msg;
        const [evokedCommand] = msg.content.trim().split(/\s+/);
        const args = msg.content.replace(evokedCommand, '').trim();
        if (!args || args === 'help') {
            return msg.channel.send({ embeds: [helpEmbed(evokedCommand)] });
        }

        let [subCommand] = args.split(/\s+/);
        let subArgs = args.replace(subCommand, '').trim();
        if (!subCommands.includes(subCommand)) {
            subCommand = 'set';
            subArgs = args;
        }

        const stickyMessageSearchResult = await StickyMessage.find({ channelId });
        let [stickyMessage] = stickyMessageSearchResult.length === 1 ? stickyMessageSearchResult : [];

        if (subCommand === 'set') {
            const regexCheck = /^(?<message>[\S].+[\S])\s*$/s;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.message) {
                return msg.channel.send({ embeds: [missingInfoEmbed('Set', `You need to provide the expected format to create a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { message } = regexMatches.groups;
            if (!stickyMessage) {
                stickyMessage = new StickyMessage({
                    channelId,
                    timeInterval: DEFAULT_TIME_INTERVAL,
                    messageCount: DEFAULT_MESSAGE_COUNT,
                });
            }
            stickyMessage.message = message;
            stickyMessage.moderator = author.toString();
            stickyMessage.updatedDate = new Date();

            try {
                stickyMessage.save();
            } catch {
                return msg.channel.send({ embeds: [failedEmbed('Set', channelId)] });
            }

            try {
                modLogsChannel.send({ embeds: [channelEmbed('Set', stickyMessageEmbedField(moment(stickyMessage.updatedDate).utcOffset(0).format('YYYY-MM-DD HH:mm:ss'), stickyMessage.moderator, stickyMessage.message, `${stickyMessage.timeInterval}`, `${stickyMessage.messageCount}`, stickyMessage.channelId), Colors.Green)] });
            } catch {
                msg.channel.send({ embeds: [noChannelEmbed('Set', 'Mod Log')] });
            }

            msg.channel.send({ embeds: [stickyMessageEmbed(stickyMessage.message)] });
            return msg.react('✅');
        }

        if (subCommand === 'count') {
            if (!stickyMessage) {
                return msg.channel.send({ embeds: [notFoundEmbed('Configure minimum message count', channelId)] });
            }

            const regexCheck = /^(?<messageCount>[\d]+)\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.messageCount) {
                return msg.channel.send({ embeds: [missingInfoEmbed('Configure minimum message count', `You need to provide a number to set the minimum message count for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { messageCount } = regexMatches.groups;
            if (parseInt(messageCount) < MIN_MESSAGE_COUNT || parseInt(messageCount) > MAX_MESSAGE_COUNT) {
                return msg.channel.send({ embeds: [missingInfoEmbed('Configure minimum message count', `You need to provide a number between ${MIN_MESSAGE_COUNT} and ${MAX_MESSAGE_COUNT} to set the minimum message count for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }
            stickyMessage.messageCount = parseInt(messageCount);
            stickyMessage.moderator = author.toString();
            stickyMessage.updatedDate = new Date();

            try {
                stickyMessage.save();
            } catch {
                return msg.channel.send({ embeds: [failedEmbed('Configure minimum message count', channelId)] });
            }

            try {
                modLogsChannel.send({ embeds: [channelEmbed('Configure minimum message count', stickyMessageEmbedField(moment(stickyMessage.updatedDate).utcOffset(0).format('YYYY-MM-DD HH:mm:ss'), stickyMessage.moderator, stickyMessage.message, `${stickyMessage.timeInterval}`, `${stickyMessage.messageCount}`, stickyMessage.channelId), Colors.Green)] });
            } catch {
                msg.channel.send({ embeds: [noChannelEmbed('Configure minimum message count', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'time') {
            if (!stickyMessage) {
                return msg.channel.send({ embeds: [notFoundEmbed('Configure minimum time interval', channelId)] });
            }

            const regexCheck = /^(?<timeInterval>[\d]+)\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.timeInterval) {
                return msg.channel.send({ embeds: [missingInfoEmbed('Configure minimum time interval', `You need to provide a number to set the minimum time interval for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { timeInterval } = regexMatches.groups;
            if (parseInt(timeInterval) < MIN_TIME_INTERVAL || parseInt(timeInterval) > MAX_TIME_INTERVAL) {
                return msg.channel.send({ embeds: [missingInfoEmbed('Configure minimum time interval', `You need to provide a number between ${MIN_TIME_INTERVAL} and ${MAX_TIME_INTERVAL} to set the minimum time interval for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }
            stickyMessage.timeInterval = parseInt(timeInterval);
            stickyMessage.moderator = author.toString();
            stickyMessage.updatedDate = new Date();

            try {
                stickyMessage.save();
            } catch {
                return msg.channel.send({ embeds: [failedEmbed('Configure minimum message count', channelId)] });
            }

            try {
                modLogsChannel.send({ embeds: [channelEmbed('Configure minimum message count', stickyMessageEmbedField(moment(stickyMessage.updatedDate).utcOffset(0).format('YYYY-MM-DD HH:mm:ss'), stickyMessage.moderator, stickyMessage.message, `${stickyMessage.timeInterval}`, `${stickyMessage.messageCount}`, stickyMessage.channelId), Colors.Green)] });
            } catch {
                msg.channel.send({ embeds: [noChannelEmbed('Configure minimum message count', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'unset') {
            if (!stickyMessage) {
                return msg.channel.send({ embeds: [notFoundEmbed('Delete', channelId)] });
            }

            try {
                if (stickyMessage.lastPostedId) {
                    msg.channel.messages.fetch(stickyMessage.lastPostedId).then((message) => message.delete());
                }
                stickyMessage.delete();
            } catch {
                return msg.channel.send({ embeds: [failedEmbed('Delete', channelId)] });
            }

            try {
                modLogsChannel.send({ embeds: [channelEmbed('Delete', stickyMessageEmbedField(moment(stickyMessage.updatedDate).utcOffset(0).format('YYYY-MM-DD HH:mm:ss'), stickyMessage.moderator, stickyMessage.message, `${stickyMessage.timeInterval}`, `${stickyMessage.messageCount}`, stickyMessage.channelId), Colors.Red)] });
            } catch {
                msg.channel.send({ embeds: [noChannelEmbed('Delete', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'info') {
            const regexCheck = /^(?<searchChannelId>[\d]+)\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            let searchChannelId = channelId;
            if (regexMatches && regexMatches.groups && regexMatches.groups.searchChannelId) {
                searchChannelId = regexMatches.groups.searchChannelId;
            }

            const searchResult = await StickyMessage.find({ channelId: searchChannelId });
            if (searchResult.length === 0) {
                return msg.channel.send({ embeds: [notFoundEmbed('Info', searchChannelId)] });
            }

            const [stickyMessage] = searchResult;
            return msg.channel.send({ embeds: [infoEmbed(stickyMessageEmbedField(moment(stickyMessage.updatedDate).utcOffset(0).format('YYYY-MM-DD HH:mm:ss'), stickyMessage.moderator, stickyMessage.message, `${stickyMessage.timeInterval}`, `${stickyMessage.messageCount}`, stickyMessage.channelId))] });
        }

        return msg.channel.send({ embeds: [helpEmbed(evokedCommand)] });
    },
};
