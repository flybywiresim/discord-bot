import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const MERGE_URL = 'https://tenor.com/view/git-merge-gitmerge-gif-18010083';

export const merge: CommandDefinition = {
    name: ['merge', 'git merge'],
    description: 'GIT MERGE!',
    category: CommandCategory.FUNNIES,
    executor: (msg) => {
        const mergeEmbed = makeEmbed({ image: { url: MERGE_URL } });
        return msg.channel.send({ embeds: [mergeEmbed] });
    },
};
