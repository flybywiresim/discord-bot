import Filter from 'bad-words';
import { Colors } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const docsearch: CommandDefinition = {
    name: ['docsearch', 'documentation', 'doc'],
    description: 'Provides a link to the documentation or documentation search for a quick link if there is no dedicated command.',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const searchWords = msg.content.replace(/^\.(doc|documentation|docsearch)\s+/, ' ').split(' ');

        if (searchWords.length <= 1) {
            const noQueryEmbed = makeEmbed({
                title: 'FlyByWire Documentation',
                description: 'Find the full FlyByWire Documentation [here](https://docs.flybywiresim.com/).',
            });
            return msg.channel.send({ embeds: [noQueryEmbed] });
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
                return msg.channel.send({ embeds: [URLEmbed] });
            } catch (_) { /**/ }

            const filter = new Filter();
            if (filter.isProfane(searchWord)) {
                return msg.reply('Please do not use profane language with this command.');
            }
        }

        // Removing first element as it is an empty string
        searchWords.shift();
        const searchQuery = searchWords.join(' ');

        // Safety to prevent users from entering unexpected data that might result in strange behavior in a URL.
        const encodedSearchQuery = encodeURIComponent(searchQuery);

        const queryEmbed = makeEmbed({
            title: 'FlyByWire Documentation Search',
            description: `Search the FlyByWire Documentation for "${searchQuery}" [here](https://docs.flybywiresim.com/?q=${encodedSearchQuery}).`,
        });
        return msg.channel.send({ embeds: [queryEmbed] });
    },
};
