import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const experimental: CommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Experimental Version',
        description: 'The experimental branch is now back in use! '
                + 'This version is similar to the development version, but contains custom systems still being developed, including the new FBW Custom Flight Management System (cFMS). '
                + 'Experimental version will be updated with the latest changes to the "custom-fpm" branch and development version regularly. '
                + '\n> No support will be offered via Discord for this version. ',
        fields: [
            { name: 'Where can I download the Experimental version? ', value: '[Via the installer here](https://api.flybywiresim.com/installer)', inline: true },
        ],
    })),
};
