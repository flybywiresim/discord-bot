import { CommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';

const MERGE_URL = `${imageBaseUrl}/memes/merge.gif`;

export const merge: CommandDefinition = {
    name: 'merge',
    description: 'GIT MERGE!',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(MERGE_URL),
};
