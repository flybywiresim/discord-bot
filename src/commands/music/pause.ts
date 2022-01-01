import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const pause: CommandDefinition = {
    name: 'pause',
    description: 'Pauses the current song',
    category: CommandCategory.MUSIC,
    executor: (msg) => {
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!');
        }
        const queue = distube.getQueue((msg));
        if (queue.playing === false) {
            return msg.channel.send('The song is already paused!')
        }
        distube.pause(msg);
    },
};

/*  Remember to add this into every music command before merge

const songRequestChannel: TextChannel = msg.guild.channels.cache.get(Channels.SONG_REQUESTS) as TextChannel
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!')
        } if (msg.channel !== songRequestChannel) {
            return msg.reply('You must be in <#SONG_REQUESTS> to use this command');
        } */
