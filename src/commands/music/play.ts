import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { distube } from '../../index';

export const play: CommandDefinition = {
    name: ['play', 'p'],
    description: 'Joins a VC and plays music',
    category: CommandCategory.MUSIC,
    executor: async (msg) => {
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!');
        }
        const args = msg.content.replace(/.play\s+/, ' ').split(' ');
        if (args.length <= 1) {
            await msg.reply('please provide a song to be played!');
            return Promise.resolve();
        }
        await distube.play(msg.member.voice.channel, args.join(' '));
    }
};
