import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const ASSISTANCE_IMAGE_URL = `${process.env.IMAGE_BASE_URL}a32nx/assistance-options.png`;

export const assistance: CommandDefinition = {
    name: ['assistance', 'assi', 'as'],
    description: 'Explains to the user why assistance options should be disabled',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const assistanceEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Assistance Options',
            description: makeLines([
                'The A32NX is not compatible with the Microsoft Flight Simulator assistance feature "Auto-Rudder". **It is required to deactivate this feature in MSFS.**',
                '',
                'We recommend turning off all assistance features in MSFS as they interfere with the A32NX systems.',
            ]),
            image: { url: ASSISTANCE_IMAGE_URL },
        });

        return msg.channel.send({ embeds: [assistanceEmbed] });
    },
};
