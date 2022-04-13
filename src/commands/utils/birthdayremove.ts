import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const birthdayremove: CommandDefinition = {
    name: 'bdayremove',
    description: 'Initiates the birthday command to remove a birthday',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const removeEmbed = makeEmbed({
            title: 'Birthday Removed',
            description: 'Birthday successfully removed.',
        });
        await msg.channel.send({ embeds: [removeEmbed] });
    },
};
