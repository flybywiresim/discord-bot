import { TextChannel } from 'discord.js';
import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const stop: CommandDefinition = {
    name: 'stop',
    description: 'Stops the music and leaves the voice channel.',
    category: CommandCategory.MUSIC,
    executor: (msg) => {
        const songRequestChannel: TextChannel = msg.guild.channels.cache.get('912736358617989210') as TextChannel
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!')
        } if (msg.channel !== songRequestChannel) {
            return;
        }
        distube.stop(msg);
    },
};

/*  Remember to add this into every music command before merge

const songRequestChannel: TextChannel = msg.guild.channels.cache.get(Channels.SONG_REQUESTS) as TextChannel
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!')
        } if (msg.channel !== songRequestChannel) {
            return;
        } */
