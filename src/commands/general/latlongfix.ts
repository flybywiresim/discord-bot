import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const latlongfix: CommandDefinition = {
    name: ['latlong', 'llfix'],
    description: 'Provides a cheat sheet for conversion between Latitude and longitude coordinates between short and long format',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        const latlongfixEmbed = makeEmbed({
            title: 'FlyByWire | Latitude & Longitude Fix Conversion Chart',
            image: { url: 'https://cdn.discordapp.com/attachments/817517626045104149/967344118554570772/oceanicfixes.png' },
        });

        await msg.channel.send({ embeds: [latlongfixEmbed] });

    },
};
