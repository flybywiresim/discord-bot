import { Colors, EmbedField, BaseChannel, TextChannel, TextBasedChannel } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, RoleGroups } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { getConn } from '../../lib/db';
import StickyMessage from '../../lib/schemas/stickyMessageSchema';
import { stickyMessageEmbed, STICKY_MOD_TITLE } from '../../lib/stickyMessageEmbed';
import Logger from '../../lib/logger';

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
            name: 'Channel ID parameter',
            value: 'If you do not provide a Channel ID, the command applies to the channel in which it is executed.',
            inline: false,
        },
        {
            name: `Setting a sticky message: \`${evokedCommand} set [channel id] <message>\``,
            value: 'Sets the provided message as a sticky message for the channel in which the command is executed. A message can contain new lines and simple Markdown elements.',
            inline: false,
        },
        {
            name: `Setting the image URL: \`${evokedCommand} image [channel id] <URL>\``,
            value: 'An image URL can be configured which gets posted as part of the sticky.',
            inline: false,
        },
        {
            name: `Setting the minimum message count: \`${evokedCommand} count [channel id] <number>\``,
            value: 'If neither the minimum message count have been posted in the channel or the minimum time interval has passed, the sticky will not be posted. This prevents spamming a channel.',
            inline: false,
        },
        {
            name: `Setting the minimum time interval: \`${evokedCommand} time [channel id] <seconds>\``,
            value: 'If neither the minimum message count have been posted in the channel or the minimum time interval has passed, the sticky will not be posted. This prevents spamming a channel.',
            inline: false,
        },
        {
            name: `Removing a sticky message: \`${evokedCommand} unset [channel id]\``,
            value: 'Removes the configured sticky message from the channel and stop posting it.',
            inline: false,
        },
        {
            name: `Showing info about a sticky message: \`${evokedCommand} info [channel id]\``,
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

const modLogEmbed = (action: string, fields: any, color: number) => makeEmbed({
    title: `${STICKY_MOD_TITLE} - ${action}`,
    fields,
    color,
});

const missingInfoEmbed = (action: string, information: string) => makeEmbed({
    title: `Sticky Message - ${action} - missing information`,
    description: `${information}`,
    color: Colors.Red,
});

const missingChannelEmbed = (channel: string) => makeEmbed({
    title: 'Sticky Message - Channel does not exist',
    description: `The Channel ID ${channel} does not refer to an existing Text or Forum channel, or a Thread. Please provide a valid channel.`,
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

const notFoundEmbed = (action: string, channel: string) => makeEmbed({
    title: `Sticky Message - ${action} - Not found`,
    description: `No Sticky Message for <#${channel}> was found.`,
    color: Colors.Red,
});

const updatedTimestampText = (updatedTimestamp: Date) => moment(updatedTimestamp).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');

const stickyMessageEmbedField = (updatedTimestampText: string, moderator: string, message: string, imageUrl: string, timeInterval: string, messageCount: string, channel: string): EmbedField[] => [
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
        name: 'Last updated timestamp',
        value: updatedTimestampText,
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
        inline: true,
        name: 'Image URL',
        value: imageUrl || 'Empty',
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
    requirements: { roles: RoleGroups.STAFF },
    executor: async (msg) => {
        const subCommands = ['set', 'image', 'count', 'time', 'unset', 'info'];
        const conn = getConn();
        if (!conn) {
            return msg.reply({ embeds: [noConnEmbed] });
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const { author } = msg;
        const [evokedCommand] = msg.content.trim().split(/\s+/);
        const args = msg.content.replace(evokedCommand, '').trim();
        if (!args || args === 'help') {
            return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
        }

        let [subCommand] = args.split(/\s+/);
        let subArgs = args.replace(subCommand, '').trim();
        if (!subCommands.includes(subCommand)) {
            subCommand = 'info';
            subArgs = args;
        }

        let { channelId } = msg;
        const regexCheck = /^(?:(?<channelId>[\d]{6,}))\s*.*$/s;
        const regexMatches = subArgs.match(regexCheck);
        if (regexMatches && regexMatches.groups.channelId) {
            ({ channelId } = regexMatches.groups);
            subArgs = subArgs.replace(channelId, '').trim();
        }
        const stickiedChannel = msg.guild.channels.resolve(channelId) as BaseChannel | null;
        if (!stickiedChannel || ['TextChannel', 'ForumChannel', 'ThreadChannel'].indexOf(stickiedChannel.constructor.name) === -1) {
            return msg.reply({ embeds: [missingChannelEmbed(channelId)] });
        }

        const stickyMessageSearchResult = await StickyMessage.find({ channelId });
        let [stickyMessage] = stickyMessageSearchResult.length === 1 ? stickyMessageSearchResult : [];

        if (subCommand === 'set') {
            const regexCheck = /^(?<message>[\S].+[\S])\s*$/s;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.message) {
                return msg.reply({ embeds: [missingInfoEmbed('Set', `You need to provide the expected format to create a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
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
            stickyMessage.updatedTimestamp = new Date();
            if (['TextChannel', 'ThreadChannel'].indexOf(stickiedChannel.constructor.name) >= 0) {
                if (stickyMessage.lastPostedId) {
                    try {
                        const previousSticky = await (stickiedChannel as TextBasedChannel).messages.fetch(stickyMessage.lastPostedId);
                        previousSticky.delete();
                    } catch {
                        Logger.debug('Last posted sticky can not be found or deleted, ignoring and continuing.');
                    }
                }
                const currentSticky = await (stickiedChannel as TextBasedChannel).send({ embeds: [stickyMessageEmbed(stickyMessage.message, stickyMessage.imageUrl)] });
                stickyMessage.lastPostedId = currentSticky.id;
            }

            try {
                stickyMessage.save();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Set', channelId)] });
            }

            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed('Set',
                        stickyMessageEmbedField(
                            updatedTimestampText(stickyMessage.updatedTimestamp),
                            stickyMessage.moderator,
                            stickyMessage.message,
                            stickyMessage.imageUrl,
                            `${stickyMessage.timeInterval}`,
                            `${stickyMessage.messageCount}`,
                            stickyMessage.channelId,
                        ),
                        Colors.Green)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed('Set', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'image') {
            if (!stickyMessage) {
                return msg.reply({ embeds: [notFoundEmbed('Configure image URL', channelId)] });
            }

            const regexCheck = /^(?<imageUrl>https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*))\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.imageUrl) {
                return msg.reply({ embeds: [missingInfoEmbed('Configure image URL', `You need to provide a URL for the image to include in the sticky. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { imageUrl } = regexMatches.groups;
            stickyMessage.imageUrl = imageUrl;
            stickyMessage.moderator = author.toString();
            stickyMessage.updatedTimestamp = new Date();

            try {
                stickyMessage.save();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Configure image URL', channelId)] });
            }

            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed('Configure image URL',
                        stickyMessageEmbedField(
                            updatedTimestampText(stickyMessage.updatedTimestamp),
                            stickyMessage.moderator,
                            stickyMessage.message,
                            stickyMessage.imageUrl,
                            `${stickyMessage.timeInterval}`,
                            `${stickyMessage.messageCount}`,
                            stickyMessage.channelId,
                        ),
                        Colors.Green)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed('Configure image URL', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'count') {
            if (!stickyMessage) {
                return msg.reply({ embeds: [notFoundEmbed('Configure minimum message count', channelId)] });
            }

            const regexCheck = /^(?<messageCount>[\d]+)\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.messageCount) {
                return msg.channel.send({ embeds: [missingInfoEmbed('Configure minimum message count', `You need to provide a number to set the minimum message count for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { messageCount } = regexMatches.groups;
            if (parseInt(messageCount) < MIN_MESSAGE_COUNT || parseInt(messageCount) > MAX_MESSAGE_COUNT) {
                return msg.reply({ embeds: [missingInfoEmbed('Configure minimum message count', `You need to provide a number between ${MIN_MESSAGE_COUNT} and ${MAX_MESSAGE_COUNT} to set the minimum message count for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }
            stickyMessage.messageCount = parseInt(messageCount);
            stickyMessage.moderator = author.toString();
            stickyMessage.updatedTimestamp = new Date();

            try {
                stickyMessage.save();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Configure minimum message count', channelId)] });
            }

            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed('Configure minimum message count',
                        stickyMessageEmbedField(
                            updatedTimestampText(stickyMessage.updatedTimestamp),
                            stickyMessage.moderator,
                            stickyMessage.message,
                            stickyMessage.imageUrl,
                            `${stickyMessage.timeInterval}`,
                            `${stickyMessage.messageCount}`,
                            stickyMessage.channelId,
                        ),
                        Colors.Green)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed('Configure minimum message count', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'time') {
            if (!stickyMessage) {
                return msg.reply({ embeds: [notFoundEmbed('Configure minimum time interval', channelId)] });
            }

            const regexCheck = /^(?<timeInterval>[\d]+)\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.timeInterval) {
                return msg.reply({ embeds: [missingInfoEmbed('Configure minimum time interval', `You need to provide a number to set the minimum time interval for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { timeInterval } = regexMatches.groups;
            if (parseInt(timeInterval) < MIN_TIME_INTERVAL || parseInt(timeInterval) > MAX_TIME_INTERVAL) {
                return msg.reply({ embeds: [missingInfoEmbed('Configure minimum time interval', `You need to provide a number between ${MIN_TIME_INTERVAL} and ${MAX_TIME_INTERVAL} to set the minimum time interval for a sticky message. Check \`${evokedCommand} help\` for more details.`)] });
            }
            stickyMessage.timeInterval = parseInt(timeInterval);
            stickyMessage.moderator = author.toString();
            stickyMessage.updatedTimestamp = new Date();

            try {
                stickyMessage.save();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Configure minimum message count', channelId)] });
            }

            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed('Configure minimum message count',
                        stickyMessageEmbedField(
                            updatedTimestampText(stickyMessage.updatedTimestamp),
                            stickyMessage.moderator,
                            stickyMessage.message,
                            stickyMessage.imageUrl,
                            `${stickyMessage.timeInterval}`,
                            `${stickyMessage.messageCount}`,
                            stickyMessage.channelId,
                        ),
                        Colors.Green)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed('Configure minimum message count', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'unset') {
            if (!stickyMessage) {
                return msg.reply({ embeds: [notFoundEmbed('Delete', channelId)] });
            }

            try {
                if (stickyMessage.lastPostedId && ['TextChannel', 'ThreadChannel'].indexOf(stickiedChannel.constructor.name) >= 0) {
                    try {
                        const previousSticky = await (stickiedChannel as TextBasedChannel).messages.fetch(stickyMessage.lastPostedId);
                        previousSticky.delete();
                    } catch {
                        Logger.debug('Last posted sticky can not be found or deleted, ignoring and continuing.');
                    }
                }
                stickyMessage.deleteOne();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Delete', channelId)] });
            }

            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed('Delete',
                        stickyMessageEmbedField(
                            updatedTimestampText(stickyMessage.updatedTimestamp),
                            stickyMessage.moderator,
                            stickyMessage.message,
                            stickyMessage.imageUrl,
                            `${stickyMessage.timeInterval}`,
                            `${stickyMessage.messageCount}`,
                            stickyMessage.channelId,
                        ),
                        Colors.Red)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed('Delete', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'info') {
            const searchResult = await StickyMessage.find({ channelId });
            if (searchResult.length === 0) {
                return msg.reply({ embeds: [notFoundEmbed('Info', channelId)] });
            }

            const [stickyMessage] = searchResult;
            return msg.reply({
                embeds: [infoEmbed(
                    stickyMessageEmbedField(
                        updatedTimestampText(stickyMessage.updatedTimestamp),
                        stickyMessage.moderator,
                        stickyMessage.message,
                        stickyMessage.imageUrl,
                        `${stickyMessage.timeInterval}`,
                        `${stickyMessage.messageCount}`,
                        stickyMessage.channelId,
                    ),
                )],
            });
        }

        return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
    },
};
