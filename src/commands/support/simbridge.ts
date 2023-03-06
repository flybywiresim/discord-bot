import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const simbridgeEmbed = makeEmbed({
    title: 'FlyByWire Support | SimBridge',
    description: makeLines([
        'SimBridge is our custom-built solution to connect our aircraft to various external devices and data. It is found in the FBW Installer and ensures features will function seamlessly requiring fewer extra steps before launching into your flights.',
        '',
        '> **Important Note:** Please keep SimBridge updated at all times regardless of the version of aircraft you are currently flying!',
        '',
        'Please [**read our documentation here**](https://docs.flybywiresim.com/simbridge) for additional information and status of associated features.',
    ]),
});

export const simbridge: MessageCommandDefinition = {
    name: ['simbridge', 'sb'],
    description: 'Describe SimBridge and provide support information',
    category: CommandCategory.SUPPORT,
    genericEmbed: simbridgeEmbed,
};
