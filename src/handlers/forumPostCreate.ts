import { getConn } from '../lib/db';
import Logger from '../lib/logger';
import StickyMessage from '../lib/schemas/stickyMessageSchema';
import { stickyMessageEmbed } from '../lib/stickyMessageEmbed';

const MAX_RETRIES = 5;
const SLEEP_TIMER = 0.5 * 1000;

module.exports = {
    event: 'threadCreate',
    executor: async (thread) => {
        const { parentId, parent, name } = thread;
        Logger.debug(`Forum Post Create - Handling thread create for ${name}`);
        const { name: parentName, type } = parent;
        Logger.debug(`Forum Post Create - Parent ID: ${parentId} - Parent Type: ${type} - Parent Name: ${parentName}`);
        if (type !== 15) {
            Logger.debug('Forum Post Create - Thread not created in a Forum Channel, skipping.');
            return;
        }

        const conn = getConn();
        if (!conn) {
            Logger.debug('Forum Post Create - Unable to connect to database, skipping.');
            return;
        }

        const stickyMessageSearchResult = await StickyMessage.find({ channelId: parentId });
        const [stickyMessage] = stickyMessageSearchResult.length === 1 ? stickyMessageSearchResult : [];
        if (!stickyMessage) {
            Logger.debug('Forum Post Create - No sticky for the forum, skipping.');
            return;
        }

        const { message, imageUrl } = stickyMessage;
        Logger.debug('Forum Post Create - Posting new sticky.');
        let retryCount = MAX_RETRIES;
        await thread.messages.fetch({ limit: 1 });
        while (thread.messages.cache.size === 0 && retryCount > 0) {
            Logger.debug(`Forum Post Create - Waiting for initial message - retry count: ${retryCount}`);
            // eslint-disable-next-line no-await-in-loop
            await new Promise((f) => setTimeout(f, SLEEP_TIMER));
            // eslint-disable-next-line no-await-in-loop
            await thread.messages.fetch({ limit: 1 });
            retryCount--;
        }
        if (thread.messageCount > 0) {
            await thread.send({ embeds: [stickyMessageEmbed(message, imageUrl)] });
            return;
        }
        Logger.debug('Forum Post Create - Thread did not initialize in time');
    },
};
