import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed, makeLines } from '../lib/embed';

export const willithave: CommandDefinition = {
    name: ['thumb', 'willithave'],
    description: 'Answers the big question, will it have FEATURE?',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'Will the aircraft have [FEATURE]?',
        description: makeLines(['The FBW rule of thumb is:',
                ,
                'If it\'s in the real aircraft, it\'ll be there.',
        ]),
    })),
};
