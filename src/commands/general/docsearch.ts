import Filter from 'bad-words';
import { Colors } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const DOCS_BASE_URL = 'https://docs.flybywiresim.com';

export const docsearch: CommandDefinition = {
    name: ['docsearch', 'documentation', 'doc', 'docs'],
    description: 'Provides a link to the documentation or documentation search for a quick link if there is no dedicated command.',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const searchWords = msg.content.split(/\n|\r|\.|-|>|\/|\\/)
            .at(1).split(/\s+/).slice(1)
            .filter((word) => word.length > 2);

        if (searchWords.length === 0) {
            const noQueryEmbed = makeEmbed({
                title: 'FlyByWire Documentation',
                description: `Find the full FlyByWire Documentation [here](${DOCS_BASE_URL}).`,
            });
            return replyWithEmbed(msg, noQueryEmbed);
        }

        // Safety to prevent users from sending their own links in bot output.
        for (const searchWord of searchWords) {
            try {
                const _ = new URL(searchWord);
                const URLEmbed = makeEmbed({
                    title: 'FlyByWire Documentation | Error',
                    description: 'Providing URLs to the Documentation search command is not allowed.',
                    color: Colors.Red,
                });
                return msg.reply({ embeds: [URLEmbed] });
            } catch (_) { /**/ }

            const filter = new Filter();
            if (filter.isProfane(searchWord)) {
                return msg.reply('Please do not use profane language with this command.');
            }
        }

        const searchQuery = searchWords.join(' ');

        // Safety to prevent users from entering unexpected data that might result in strange behavior in a URL.
        const encodedSearchQuery = encodeURIComponent(searchQuery);

        const queryEmbed = makeEmbed({
            title: 'FlyByWire Documentation Search',
            description: `Search the FlyByWire Documentation for "${searchQuery}" [here](${DOCS_BASE_URL}/?q=${encodedSearchQuery}).`,
        });
        return replyWithEmbed(msg, queryEmbed);
    },
};
