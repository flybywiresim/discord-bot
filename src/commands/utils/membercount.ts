import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const membercount: CommandDefinition = {
    name: 'membercount',
    description: 'Lists the guild\'s current amount of members',
    category: CommandCategory.PUBLIC,
    executor: (msg) => {
        const { memberCount } = msg.guild;

        return msg.channel.send(makeEmbed({
            title: 'Members',
            description: `${memberCount}`,
        }));
    },
};
