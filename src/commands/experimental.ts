import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const experimental: CommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Experimental Version',
        description: 'The experimental branch is currently on hold until further notice. '
                + 'We will notify you through our #server-announcements when we have integrated the custom FPM and LNAV and make the experimental version available again. '
                + 'Until then please use the development version.',
        fields: [
            { name: 'Where can I download the Development version? ', value: '[Via the installer here](https://api.flybywiresim.com/installer)', inline: true },
        ],
    })),
};
