import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const LATLONG_IMAGE_URL = `${imageBaseUrl}/general/latlongfix.png`;

const latlongfixEmbed = makeEmbed({
    title: 'FlyByWire | Latitude & Longitude Fix Conversion Chart',
    description: 'If the point you\'re looking for isn\'t part of the database, check out our guide on [adding and storing custom waypoints.](https://docs.flybywiresim.com/pilots-corner/advanced-guides/data-management/?h=data+man#format-latitude-longitude-ll)',
    image: { url: LATLONG_IMAGE_URL },
    footer: { text: 'Tip: Click the image to view in full size' },
});

export const latlongfix: MessageCommandDefinition = {
    name: ['latlong', 'llfix'],
    description: 'Provides a cheat sheet for conversion between Latitude and longitude coordinates between short and long format',
    category: CommandCategory.GENERAL,
    genericEmbed: latlongfixEmbed,
};
