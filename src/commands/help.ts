import { CommandDefinition } from '../lib/command';

export const help: CommandDefinition = {
    name: 'help',
    executor: (msg) => {
        msg.reply('I\'ve PM\'d you with the list of the commands you can use!');
    },
};
