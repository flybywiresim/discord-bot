import Filter from 'bad-words';
import { Colors } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const doc: CommandDefinition = {
    name: ['doc', 'documentation', 'docsearch'],
    description: 'Provides a link to the documentation or documentation search for a quick link if there is no dedicated command.',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const splitUp = msg.content.replace(/\.(doc|documentation|docsearch)\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            const noQueryEmbed = makeEmbed({
                title: 'FlyByWire Documentation',
                description: 'Find the full FlyByWire Documentation [here.](https://docs.flybywiresim.com/)',
            });
            return msg.channel.send({ embeds: [noQueryEmbed] });
        }

        const searchText = splitUp[1];

        // Safety to prevent users from sending their own links in bot output.
        try {
            const _ = new URL(searchText);
            const URLEmbed = makeEmbed({
                title: 'FlyByWire Documentation | Error',
                description: 'Providing URLs to the Documentation search command is not allowed.',
                color: Colors.Red,
            });
            return msg.channel.send({ embeds: [URLEmbed] });
        } catch (_) { /**/ }

        // Safety to prevent users from entering unexpected data that might result in strange behavior in a URL.
        const encodedSearchText = encodeURIComponent(searchText);
        const filter = new Filter();
        if (filter.isProfane(searchText)) {
            return msg.reply('Please do not use profane language with this command.');
        }

        const queryEmbed = makeEmbed({
            title: 'FlyByWire Documentation Search',
            description: `Find the FlyByWire Documentation for "${searchText}" [here.](https://docs.flybywiresim.com/?q=${encodedSearchText})`,
        });
        return msg.channel.send({ embeds: [queryEmbed] });
    },
};
