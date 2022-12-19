import { getConn } from '../lib/db';
import Logger from '../lib/logger';
import StickyMessage from '../lib/schemas/stickyMessageSchema';
import { stickyMessageEmbed } from '../lib/stickyMessageEmbed';

module.exports = {
    event: 'threadCreate',
    executor: async (thread) => {
        const { parentId, parent, name } = thread;
        Logger.debug(`Thread Create - Handling thread create for ${name}`);
        const { name: parentName, type } = parent;
        Logger.debug(`Thread Create - Parent ID: ${parentId} - Parent Type: ${type} - Parent Name: ${parentName}`);
        if (type !== 15) {
            Logger.debug('Thread Create - Thread not created in a Forum Channel, skipping.');
            return;
        }

        const conn = getConn();
        if (!conn) {
            Logger.debug('Thread Create - Unable to connect to database, skipping.');
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
        await thread.send({ embeds: [stickyMessageEmbed(message, imageUrl)] });
    },
};
