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
            description: 'If the point you\'re looking for isn\'t part of the database, check out our guide on [adding and storing custom waypoints.](https://docs.flybywiresim.com/pilots-corner/advanced-guides/data-management/?h=data+man#format-latitude-longitude-ll)',
            image: { url: 'https://cdn.discordapp.com/attachments/817517626045104149/967659373054816286/unknown.png' },
            footer: { text: 'Tip: Click the image to view in full size' }
        });

        await msg.channel.send({ embeds: [latlongfixEmbed] });

    },
};
