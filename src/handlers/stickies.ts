import { Message } from 'discord.js';
import commands from '../commands';
import { getConn } from '../lib/db';
import Logger from '../lib/logger';
import StickyMessage from '../lib/schemas/stickyMessageSchema';
import { stickyMessageEmbed, STICKY_MESSAGE_TITLE } from '../lib/stickyEmbed';

const runningChannelIds = [];

const addRunningChannelId = (channelId: string) => {
    runningChannelIds.push(channelId);
};

const removeRunningChannelId = (channelId: string) => {
    const channelIndex = runningChannelIds.indexOf(channelId, 0);
    if (channelIndex > -1) {
        runningChannelIds.splice(channelIndex, 1);
    }
};

module.exports = {
    event: 'messageCreate',
    executor: async (msg) => {
        const { channel, guild, content, embeds } = msg;
        if (runningChannelIds.includes(channel.id)) {
            Logger.debug('Sticky Message - Channel already being processed, skipping.');
            return;
        }

        if (guild === null) {
            // DMs
            return;
        }

        if (content === null) {
            // Old Message
            return;
        }

        if (msg.content.startsWith('.')) {
            const usedCommand = msg.content.substring(1, msg.content.includes(' ') ? msg.content.indexOf(' ') : msg.content.length).toLowerCase();
            const command = commands[usedCommand];
            if (command) {
                Logger.debug('Sticky Message - Recognized command, skipping processing');
                return;
            }
        }

        const [receivedEmbed] = embeds.length > 0 ? embeds : [];
        if (receivedEmbed && receivedEmbed.title === STICKY_MESSAGE_TITLE && msg.author.bot === true) {
            // Sticky message itself
            Logger.debug('Sticky Message - Message is the Sticky Message for the channel, skipping.');
            return;
        }

        const conn = getConn();
        if (!conn) {
            Logger.debug('Sticky Message - Unable to connect to database, skipping.');
            return;
        }

        const stickyMessageSearchResult = await StickyMessage.find({ channelId: channel.id });
        const [stickyMessage] = stickyMessageSearchResult.length === 1 ? stickyMessageSearchResult : [];
        if (!stickyMessage) {
            Logger.debug('Sticky Message - No Sticky Message for the channel, skipping.');
            return;
        }

        addRunningChannelId(channel.id);

        let postNewSticky = true;
        const { message, messageCount, timeInterval, lastPostedId } = stickyMessage;
        const previousSticky = lastPostedId ? await channel.messages.fetch(lastPostedId) : null;
        if (previousSticky) {
            Logger.debug('Sticky Message - Previous Sticky found');
            const timeDifference = new Date().getTime() - previousSticky.createdTimestamp;
            if (timeDifference <= timeInterval * 1000) {
                Logger.debug('Sticky Message - Previous Sticky time difference lower than interval');
                const histMessagesMap = await channel.messages.fetch({ limit: (messageCount) });
                const histMessages: Message[] = Array.from(histMessagesMap.values());
                for (const histMessage of histMessages) {
                    if (histMessage.id === previousSticky.id) {
                        Logger.debug('Sticky Message - Previous Sticky within message count > No new post');
                        postNewSticky = false;
                        break;
                    }
                }
            }

            if (postNewSticky) {
                Logger.debug('Sticky Message - Previous Sticky too old or not in message count > Deleting old one');
                await previousSticky.delete();
            }
        }

        if (postNewSticky) {
            Logger.debug('Sticky Message - Previous Sticky does not exist, is too old or not in message count > Posting new one');
            const currentSticky = await channel.send({ embeds: [stickyMessageEmbed(message)] });
            stickyMessage.lastPostedId = currentSticky.id;
            try {
                stickyMessage.save();
            } catch {
                Logger.error(`Sticky Message - unable to update Sticky Message lastPostedId for channel ${channel.id}`);
            }
        }

        removeRunningChannelId(channel.id);
    },
};
