import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const audio: CommandDefinition = {
    name: 'audio',
    description: 'Provides support information about A32NX audio configuration',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const audioEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Audio Configuration',
            description: makeLines([
                'For detailed information about various audio configurations on the EFB and in-flight audio triggers please see the guide below.',
                '',
                '[A32NX Audio Configuration](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/audio/)',
            ]),
        });

        await msg.channel.send({ embeds: [audioEmbed] });
    },
};
