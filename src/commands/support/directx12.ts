import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const directx12Embed = makeEmbed({
    title: 'MSFS | DirectX 12',
    description: 'Use of DX11 is still recommended for best performance due to an issue with some glass cockpit technologies in the DX12 version of the simulator. This is not a FBW issue and we cannot address it for now - please keep in mind DX12 is officially a "beta feature" and you use it at your own risk. No support will be provided.',
});

export const directx12: MessageCommandDefinition = {
    name: 'dx12',
    description: 'Explaination for the current state of MSFS DirectX12 support.',
    category: CommandCategory.SUPPORT,
    genericEmbed: directx12Embed,
};
