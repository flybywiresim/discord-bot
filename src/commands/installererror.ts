import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const installererror: CommandDefinition = {
    name: ['installererror', 'error'],
    description: 'Provides a link to the installer error page within docs',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Installer Error',
        description: 'Please visit [this link](https://docs.flybywiresim.com/start/reported-issues/#installer-issues) for help with installer errors.'
    })),
};
