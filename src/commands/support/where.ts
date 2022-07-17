import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const WHERE_IMAGE_URL = 'https://cdn.discordapp.com/attachments/897491699167793182/997638182009057290/where.png';

export const where: CommandDefinition = {
    name: 'where',
    description: 'Provides an image of which aircraft to select in the aircraft selector',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const whereEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Where is my aircraft?',
            description: 'The FlyByWire A32NX addon is now separate from the default a320neo. Make sure you are selecting FlyByWire Simulations A320neo (LEAP) in the aircraft selector instead of the default a320neo.',
            image: { url: WHERE_IMAGE_URL },
            footer: { text: 'Tip: Click the image to view in full size' },
        });

        await msg.channel.send({ embeds: [whereEmbed] });
    },
};
