import { Message } from 'discord.js';
import commands from '../commands';
import { getConn } from '../lib/db';
import Logger from '../lib/logger';
import StickyMessage from '../lib/schemas/stickyMessageSchema';
import { stickyMessageEmbed, STICKY_MESSAGE_TITLE, STICKY_MOD_TITLE } from '../lib/stickyMessageEmbed';

const runningChannelIds = [];

const addRunningChannelId = (channelId: string) => {
    if (!runningChannelIds.includes(channelId)) {
        runningChannelIds.push(channelId);
    }
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
        Logger.debug(`Sticky Message - Handling message in ${msg.channel.name}`);
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
        if (receivedEmbed && msg.author.bot === true && (receivedEmbed.title === STICKY_MESSAGE_TITLE || receivedEmbed.title.startsWith(STICKY_MOD_TITLE))) {
            // Sticky message itself
            Logger.debug('Sticky Message - Message is the Sticky Message for the channel or the Mod Log message, skipping.');
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
        const { message, imageUrl, messageCount, timeInterval, lastPostedId } = stickyMessage;
        let previousSticky = null;
        if (lastPostedId) {
            try {
                previousSticky = await channel.messages.fetch(lastPostedId);
            } catch {
                Logger.debug('Sticky Message - Previous sticky can not be found.');
            }
        }
        if (previousSticky) {
            const timeDifference = new Date().getTime() - previousSticky.createdTimestamp;
            if (timeDifference <= timeInterval * 1000) {
                const historyMessagesMap = await channel.messages.fetch({ limit: (messageCount) });
                const historyMessages: Message[] = Array.from(historyMessagesMap.values());
                for (const historyMessage of historyMessages) {
                    if (historyMessage.id === previousSticky.id) {
                        Logger.debug('Sticky Message - Previous Sticky not too old and within message count - No new post needed.');
                        postNewSticky = false;
                        break;
                    }
                }
            }

            if (postNewSticky) {
                Logger.debug('Sticky Message - Previous Sticky too old or not in message count - Deleting old post.');
                try {
                    previousSticky.delete();
                } catch {
                    Logger.warn('Sticky Message - Unable to delete older post.');
                }
            }
        }

        if (postNewSticky) {
            Logger.debug('Sticky Message - Previous Sticky does not exist, is too old or not in message count - Posting new sticky.');
            const currentSticky = await channel.send({ embeds: [stickyMessageEmbed(message, imageUrl)] });
            stickyMessage.lastPostedId = currentSticky.id;
            try {
                stickyMessage.save();
            } catch {
                Logger.error(`Sticky Message - unable to update Sticky Message lastPostedId for channel ${channel.id}.`);
            }
        }

        removeRunningChannelId(channel.id);
    },
};
