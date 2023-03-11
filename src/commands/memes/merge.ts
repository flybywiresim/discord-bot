import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const MERGE_URL = `${process.env.IMAGE_BASE_URL}memes/merge.gif`;

export const merge: CommandDefinition = {
    name: 'merge',
    description: 'GIT MERGE!',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(MERGE_URL),
};
