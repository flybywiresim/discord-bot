import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const wasm: CommandDefinition = {
    name: ['wasm', 'load'],
    description: 'Explains the long loading times after an install or update',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const wasmEmbed = makeEmbed({
            title: 'FlyByWire Support | Long loading times',
            description: 'The first load after installing or updating the addon will take a while due to WASM being compiled. This is normal and may take more than 15 minutes or even longer on slower PCs.',
        });

        return msg.channel.send({ embeds: [wasmEmbed] });
    },
};
