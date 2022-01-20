import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const membercount: CommandDefinition = {
    name: 'membercount',
    description: 'Lists the guild\'s current amount of members',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        const { memberCount } = msg.guild;
        const membercountEmbed = makeEmbed({
            title: 'Members',
            description: `${memberCount}`,
        });

        return msg.channel.send({ embeds: [membercountEmbed] });
    },
};
