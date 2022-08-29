import { Colors, Message } from 'discord.js';
import { getConn } from '../lib/db';
import { makeEmbed } from '../lib/embed';
import Logger from '../lib/logger';
import StickyMessage from '../lib/schemas/stickyMessageSchema';

const STICKY_TITLE = 'Stickied Message';

const stickyEmbed = (description: string) => makeEmbed({
    title: STICKY_TITLE,
    description,
    color: Colors.Aqua,
});

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
            Logger.debug('SM - Channel already being processed, skipping.');
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

        const [receivedEmbed] = embeds.length > 0 ? embeds : [];
        if (receivedEmbed && receivedEmbed.title === STICKY_TITLE && msg.author.bot === true) {
            // Sticky message itself
            Logger.debug('SM - Message is the Sticky Message for the channel, skipping.');
            return;
        }

        const conn = getConn();
        if (!conn) {
            Logger.debug('SM - Unable to connect to database, skipping.');
            return;
        }

        const stickyMessageSearchResult = await StickyMessage.find({ channelId: channel.id });
        const [stickyMessage] = stickyMessageSearchResult.length === 1 ? stickyMessageSearchResult : [];
        if (!stickyMessage) {
            Logger.debug('SM - No Sticky Message for the channel, skipping.');
            return;
        }

        addRunningChannelId(channel.id);

        const { message, messageCount, timeInterval } = stickyMessage;
        let messageCounter = 0;
        let previousSticky = null;
        const histMessagesMap = await channel.messages.fetch({ limit: (messageCount + 1) });
        const histMessages: Message[] = Array.from(histMessagesMap.values());
        for (const histMessage of histMessages) {
            messageCounter++;
            const [messageEmbed] = histMessage.embeds.length > 0 ? histMessage.embeds : [];
            if (messageEmbed && messageEmbed.title === STICKY_TITLE && histMessage.author.bot === true) {
                previousSticky = histMessage;
                Logger.debug(`SM - 06 - Found previous Sticky at "${previousSticky.createdTimestamp}"`);
                break;
            }
        }

        if (previousSticky) {
            const timeDifference = new Date().getTime() - previousSticky.createdTimestamp;
            if (timeDifference > timeInterval * 1000 || messageCounter >= messageCount) {
                Logger.debug('SM - Deleting older sticky and posting new one.');
                await previousSticky.delete();
                await channel.send({ embeds: [stickyEmbed(message)] });
            }
            removeRunningChannelId(channel.id);
            return;
        }
        Logger.debug('SM - Posting new sticky.');
        await channel.send({ embeds: [stickyEmbed(message)] });
        removeRunningChannelId(channel.id);
    },
};
