import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const trythis: CommandDefinition = {
    name: 'trythis',
    description: 'Provide basic troubleshooting steps',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const trythisEmbed = makeEmbed({
            title: 'Try This',
            description: 'Please try and remove all other mods/liveries from the community folder and test our addon again. This will help rule out mod conflicts.',
            footer: { text: 'Report back the result of this test.' },
        });

        return msg.channel.send({ embeds: [trythisEmbed] });
    },
};
