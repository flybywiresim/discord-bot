import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const LATLONG_IMAGE_URL = 'https://cdn.discordapp.com/attachments/943530743978672138/1048823475084722246/latlongfix.png';

export const latlongfix: CommandDefinition = {
    name: ['latlong', 'llfix'],
    description: 'Provides a cheat sheet for conversion between Latitude and longitude coordinates between short and long format',
    category: CommandCategory.GENERAL,
    executor: (msg) => {
        const latlongfixEmbed = makeEmbed({
            title: 'FlyByWire | Latitude & Longitude Fix Conversion Chart',
            description: 'If the point you\'re looking for isn\'t part of the database, check out our guide on [adding and storing custom waypoints.](https://docs.flybywiresim.com/pilots-corner/advanced-guides/data-management/?h=data+man#format-latitude-longitude-ll)',
            image: { url: LATLONG_IMAGE_URL },
            footer: { text: 'Tip: Click the image to view in full size' },
        });

        return msg.channel.send({ embeds: [latlongfixEmbed] });
    },
};
