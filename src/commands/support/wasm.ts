import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const wasm: CommandDefinition = {
    name: ['wasm', 'load'],
    description: 'Explains the long loading times after an install or update',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const wasmEmbed = makeEmbed({
                title: 'FlyByWire Support | Long loading times',
                description: 'The first load after installing or updating the addon will take a while due to WASM being compiled. This is normal and may take up to 10 minutes or longer.',
            });

        await msg.channel.send({ embeds: [wasmEmbed] });

    },
};
