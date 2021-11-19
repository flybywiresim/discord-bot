import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const directx12: CommandDefinition = {
    name: 'dx12',
    description: 'Explaination for the current state of MSFS DirectX12 support.',
    category: CommandCategory.GENERAL,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'MSFS | DirectX 12',
        description: 'Use of DX11 is still recommended for best performance due to an issue with some glass cockpit technologies in the DX12 version of the simulator. '
                + 'This is not a FBW issue and we cannot address it for now - please keep in mind DX12 is officially a "beta feature" and thus should not be used unless you know what you are doing. '
    })),
};

/*
Use of DX11 is still recommended for best performance due to an issue with some glass cockpit technologies in the DX12 version of the simulator. This is not an FBW issue and we cannot address it for now - please keep in mind DX12 is officially a "beta feature" and thus should not be used unless you know what you are doing.
*/