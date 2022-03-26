import { Client } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

// const Util = require('../utils/utils.js'); <-- makeEmbed

// TODO: Use mySQL db for the following imports
// const Member = require('../models/Member.js');
// const ServerRepository = require('../repositories/server-repository');
// const Server = require('../models/Server.js');

export const birthday: CommandDefinition = {
    name: ['birthday'],
    description: 'Adds/Edits the user`s birthday',
    category: CommandCategory.BIRTHDAYS,
    requiredPermissions: ['BAN_MEMBERS'],
    executor: async (msg, args) => {
        const splitUp = msg.content.replace(/\.birthday\s+/, ' ').split(' ');

        if (splitUp.length !== 3) {
            await msg.reply('Please provide a birthday');
            return Promise.resolve();
        }
            const errorEmbed = makeEmbed( {
                title: 'Error',
                description: "The birthday format is dd mm yyyy",
                });
            await msg.channel.send({ embeds: [errorEmbed] });

        },

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

            const editEmbed = makeEmbed( {
               title: 'Birthday Edited',
                description:`Your birthday is modified to ${date}`,
            })
            await msg.channel.send({ embeds: [editEmbed] });
        } else {
            const newBirthday = new Member({
                user: message.author.tag,
                birthday: date,
                discord_id: message.author.id,
            }),
            dbServer.members.push(newBirthday),
            dbServer.markModified('members'),
            await dbServer.save(),

            const setEmbed = makeEmbed( {
                title: 'Birthday is Set',
                description: `Your birthday has been successfully set to ${date}`,
            },

                await msg.channel.send({ embeds: [setEmbed] });
        }
    }
};
