import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const experimental: CommandDefinition = {
    name: ['experimental', 'exp'],
    description: 'Explains the current state of the experimental build',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Experimental Version',
        description: 'This version is similar to the development version, but contains custom systems still being developed for testing purposes; bugs and Issues are to be expected. '
                + 'Please read our [Experimental Version Support Page](https://docs.flybywiresim.com/fbw-a32nx/support/exp/) before using this version. '
                + 'No support will be offered via Discord for Experimental. ',

        fields: [
            { name: 'Where can I find more information, including features and known issues? ', value: '[Via our documents here](https://docs.flybywiresim.com/fbw-a32nx/support/exp/)', inline: false },
            { name: 'Where can I download the Experimental version? ', value: '[Via the installer here](https://api.flybywiresim.com/installer)', inline: false },
        ],
    })),
};
