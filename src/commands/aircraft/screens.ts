import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SCREENS_HELP_URL = `${process.env.IMAGE_BASE_URL}a32nx/screens.png`;

export const screens: CommandDefinition = {
    name: ['screens', 'screen'],
    description: 'Display help with avionics',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const screensEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Screens Fix',
            description: makeLines([
                'Turn the following knobs to illuminate the dark screens.',
                '(Make sure to have batteries and Ground Power ON)',
            ]),
            image: { url: SCREENS_HELP_URL },
        });

        return msg.channel.send({ embeds: [screensEmbed] });
    },
};
