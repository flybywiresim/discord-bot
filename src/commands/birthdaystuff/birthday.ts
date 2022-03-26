import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
const Util = require('../utils/utils.js');
const Member = require('../models/Member.js');
const ServerRepository = require('../repositories/server-repository');
const Server = require('../models/Server.js');

export const birthday: CommandDefinition = {
    name: ['Birthday', 'birthday'],
    description: 'Adds/Edits the user`s birthday',
    category: CommandCategory.BIRTHDAYSTUFF,
    executor: async (message, args) => {
        let item = '';
        for (let i = 0; i < args.length; i++) {
            item += `${args[i]} `;
        }
        const { channel } = message;

        if (args === undefined || args.length !== 3) {
            const embeded = Util.embedMessage('Error',
                message.author.tag, '0x232529', "Birthday's format is dd mm yyyy");
            channel.send(embeded);
            return;
        }
        const dateString = `${args[1]} ${args[0]} ${args[2]}`;
        const date = new Date(dateString);
        const dbServer = await ServerRepository.findOrCreate(message.guild);

        const member = dbServer.members.find((m) => m.user === message.author.tag);
        if (member) {
            const memberIndex = dbServer.members.findIndex((m) => m.user === message.author.tag);
            dbServer.members[memberIndex].birthday = date;
            dbServer.members[memberIndex].discord_id = message.author.id;
            dbServer.markModified('members');
            await dbServer.save();
            const embededMessage = Util.embedMessage(
                'Birthday Set',
                message.author.tag,
                '0xffff00',
                `Your birthday is modified to ${date}`,
            );
            channel.send(embededMessage);
        } else {
            const newBirthday = new Member({
                user: message.author.tag,
                birthday: date,
                discord_id: message.author.id,
            });
            dbServer.members.push(newBirthday);
            dbServer.markModified('members');
            await dbServer.save();
            const embededMessage = Util.embedMessage(
                'Birthday Set',
                message.author.tag,
                '0xffff00',
                `Your birthday is set to ${date}`,
            );
            channel.send(embededMessage);
        }
    },
};
