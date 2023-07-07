import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory } from '../../constants';

export const otter: CommandDefinition = {
    name: 'otter',
    description: 'Well, it\'s an otter',
    category: CommandCategory.MEMES,
    requirements: {
        channels: [Channels.CHAT, Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: (msg) => msg.channel.send('<:otter:905529385292029972>'),
};
