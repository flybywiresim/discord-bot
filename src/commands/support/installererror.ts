import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const installererror: CommandDefinition = {
    name: ['installererror', 'error'],
    description: 'Provides a link to the installer error page within docs',
    category: CommandCategory.SUPPORT,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Installer Error',
        description: 'Your old community folder is missing.\n'
                + '1. Open file explorer and manually create the missing folder.\n'
                + '2. Open FBW installer, go to settings, and change it to your current community folder.\n'
                + 'Explore other solutions at https://docs.flybywiresim.com/start/reported-issues/#installer-issues',
    })),
};
