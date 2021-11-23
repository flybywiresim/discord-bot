import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const queue: CommandDefinition = {
    name: ['queue', 'q'],
    description: 'Skips the current song playing and plays the next song in the queue.',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        const queue = distube.getQueue((msg));
        return msg.channel.send(makeEmbed({
            title: 'Current Queue:',
            description: queue.songs.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - ${song.formattedDuration} | Requested by ${song.user.tag}`).join('\n').toString(),
        }));
    },
};
