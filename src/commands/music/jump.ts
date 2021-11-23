import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const jump: CommandDefinition = {
    name: ['jump', 'j'],
    description: 'Jumps to a certain song in the queue',
    category: CommandCategory.MUSIC,
    executor: async (msg) => {
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!')
        }
        const args = msg.content.replace(/.jump\s+/, ' ').split(' ');
        const jumpNum = parseInt(args[1]) - 1;
        await distube.jump(msg, jumpNum);
    },
};
