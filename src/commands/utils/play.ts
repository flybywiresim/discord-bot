import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const play: CommandDefinition = {
    name: ['play', 'p'],
    description: 'Plays the top search result from youtube for the video title given.',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const args = msg.content.replace(/.play\s+/, ' ').split(' ');
        await distube.play(msg, args.join(' '));
        distube.on('playSong', (queue, song) => {
            msg.channel.send(makeEmbed({ title: `added ${song.name}` })); console.log(song.name);
        });
    },
};
