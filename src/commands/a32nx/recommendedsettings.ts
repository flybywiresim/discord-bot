import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const recommendedSettings: CommandDefinition = {
    name: 'rs',
    category: CommandCategory.A32NX,
    description: 'Provides a link to the recommended settings docs guide.',
    executor: async (msg) => {
        const recommendedSettingsEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Recommended Settings',
            description: makeLines([
                'Before embarking on your flight please ensure you have looked at our recommended settings guide.',
                '',
                'This page aims to list a few recommended settings for the Microsoft Flight Simulator, '
                + 'Windows and the A32NX itself.',
                '',
                'Please read our guide [here.](https://docs.flybywiresim.com/fbw-a32nx/settings/)',
            ]),
        });

        await msg.channel.send({ embeds: [recommendedSettingsEmbed] });
    },
};
