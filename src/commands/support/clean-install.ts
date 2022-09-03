import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const clean: CommandDefinition = {
    name: ['clean', 'clean install', 'cleaninstall', 'order66'],
    description: 'Clean Install',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const cleanEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Clean Install',
            description: makeLines([
                'We suggest trying a clean install. Please see [this guide](https://docs.flybywiresim.com/fbw-a32nx/installation/#clean-install-steps) for detailed instructions.',
            ]),
        });

        return msg.channel.send({ embeds: [cleanEmbed] });
    },
};
