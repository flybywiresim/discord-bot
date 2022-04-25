import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const test_command: CommandDefinition = {
    name: 'test',
    description: 'some test command',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        const test_embed = makeEmbed({
            title: 'FlyByWire | something',
            description: 'Oh hi there, do I fail?',
        });

        await msg.channel.send({ embeds: [test_embed] });

    },
};
