import Filter from 'bad-words';
import { ChatInputCommandInteraction, SlashCommandStringOption, Message } from 'discord.js';
import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory, RoleGroups } from '../../constants';

export const ping: CommandDefinition = {
    name: 'ping',
    description: 'Send back a message',
    category: CommandCategory.UTILS,
    //requirements: { roles: RoleGroups.BOT },
    options: [
        new SlashCommandStringOption().setName('text').setDescription('Text to display'),
    ],
    isSlashCommand: true,
    executor: (msg) => {
        const msgFilter = new Filter();
        let text;

        if (msg instanceof ChatInputCommandInteraction) {
            text = msg.options.getString('text');
        } else if (msg instanceof Message) {
            text = msg.content.replace(/\.ping\s*/, '');
        }

        if (!text || text.length === 0) {
            return msg.reply('Please provide some text.');
        }

        if (msgFilter.isProfane(text)) {
            return msg.reply('Please do not use profane language with this command.');
        }

        return replyWithMsg(msg, text);
    },
};
