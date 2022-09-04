import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const willithave: CommandDefinition = {
    name: ['thumb', 'willithave'],
    description: 'Answers the big question, will it have FEATURE?',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const willithaveEmbed = makeEmbed({
            title: 'Will the aircraft have [FEATURE]?',
            description: makeLines([
                'The FBW rule of thumb is:',
                '',
                'If it\'s in the real aircraft, it\'ll be there.',
            ]),
        });

        return msg.channel.send({ embeds: [willithaveEmbed] });
    },
};
