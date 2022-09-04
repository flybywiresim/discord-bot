import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const DEADZONE_IMAGE_URL = 'https://cdn.discordapp.com/attachments/770835189419999262/802254518376464424/Deadzone_Controls.png';

export const deadzones: CommandDefinition = {
    name: ['deadzones', 'deadzone', 'dz'],
    description: 'Display help with controller deadzones',
    category: CommandCategory.SUPPORT,
    executor: (msg) => {
        const deadzonesEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Deadzone Configuration',
            description: makeLines([
                'In certain situations your hardware maybe causing unwanted inputs when attempting to fly the aircraft. Increasing the deadzone setting for your controller can help prevent these inputs. ',
                '',
                '1. Go to your settings',
                '2. Controls and select your yoke/joystick/controller.',
                '',
                'After that click the sensitivity button on the top left which should take you to the menu where you can adjust your deadzones. ',
                "Start with 20% deadzone, if the problem persists keep increasing it. If it's fine with 20% you can then slowly decrease it too.",
            ]),
            image: { url: DEADZONE_IMAGE_URL },
        });

        return msg.channel.send({ embeds: [deadzonesEmbed] });
    },
};
