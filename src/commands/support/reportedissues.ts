import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const reportedissues: CommandDefinition = {
    name: ['reportedissues', 'issues'],
    description: 'Provides a link to the reported issues page within docs',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const reportedissuesEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Reported Issues',
            description: 'Please see [this link](https://docs.flybywiresim.com/start/reported-issues/) for a current list of reported issues.',
        });

        await msg.channel.send({ embeds: [reportedissuesEmbed] });
    },
};
