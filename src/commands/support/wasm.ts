import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const wasmEmbed = makeEmbed({
    title: 'FlyByWire Support | Long loading times',
    description: 'The first load after installing or updating the addon will take a while due to WASM being compiled. This is normal and may take over 15 minutes on slower PCs.',
});

export const wasm: MessageCommandDefinition = {
    name: ['wasm', 'load'],
    description: 'Explains the long loading times after an install or update',
    category: CommandCategory.SUPPORT,
    genericEmbed: wasmEmbed,
};
