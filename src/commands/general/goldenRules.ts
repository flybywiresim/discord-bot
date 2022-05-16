import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const goldenRules: CommandDefinition = {
    name: ['goldenrules', 'golden', 'gr'],
    description: 'Provides an image describing the golden rules an Airbus pilot should follow',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        const goldenRulesEmbed = makeEmbed({
            title: 'FlyByWire | Golden Rules',
            image: { url: 'https://media.discordapp.net/attachments/898602626436964402/921043008923795466/55982629-DD45-4E98-97E6-2B61479D5401.png?width=554&height=676' },
        });

        await msg.channel.send({ embeds: [goldenRulesEmbed] });
    },
};
