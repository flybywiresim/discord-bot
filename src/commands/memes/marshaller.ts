import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';


const genericCommandEmbed = marshallerEmbed({
    title: 'Command Title',
    description: 'The marshaller is always right :) funny meme for when users cant park the plane in the parking line',
    image: { url: 'https://tenor.com/view/cute-girl-trying-to-warning-pilot-anime-meme-gif-21114064' }, // optional
});

export const command: MessageCommandDefinition = {
    name: ['marshaller'],
    description: 'The marshaller is always right :) funny meme for when users cant park the plane in the parking line',
    category: CommandCategory.MEMES,
    genericEmbed: genericCommandEmbed,
};
