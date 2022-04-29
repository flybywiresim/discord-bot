import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { getConn } from '../../lib/db';

export const birthday: CommandDefinition = {
    name: 'birthday',
    description: 'Manages birthday reminders',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        const conn = await getConn();
        const args: string[] = msg.content.split(' ').slice(1);

        let birthdayEmbed;

        if (args[0] === 'add') {
            const user = msg.mentions.users.first();
            let birthdayDate;

            try {
                birthdayDate = new Date(args.slice(2).join(' '));
            } catch (e) {
                birthdayEmbed = makeEmbed({
                    title: 'Birthday reminder',
                    description: 'Error while parsing date',
                    color: 'RED'
                });

                // Bail out
                return msg.channel.send({ embeds: [birthdayEmbed] });
            }

            // Catch invalid dates
            if (birthdayDate.toString() === 'Invalid Date') {
                birthdayEmbed = makeEmbed({
                    title: 'Birthday reminder',
                    description: 'Invalid date',
                    color: 'RED'
                });

                // Bail out
                return msg.channel.send({ embeds: [birthdayEmbed] });
            }

            console.log(birthdayDate.toString());

            if (user && birthdayDate) {
                const guildID = msg.guild.id;
                const channelID = msg.channel.id;
                const userID = user.id;

                let birthdayDoc = await conn.models.Birthday.findOne({ userID: userID, guildID: guildID });
                
                if (birthdayDoc) {
                    birthdayDoc.birthday = birthdayDate;
                    birthdayDoc.channelID = channelID;
                    birthdayDoc.lastUpdated = new Date();
                } else {
                    birthdayDoc = new conn.models.Birthday({
                        userID: userID,
                        guildID: guildID,
                        birthday: birthdayDate,
                        channelID: channelID,
                        lastUpdated: new Date(),
                    });
                }

                await birthdayDoc.save();
            
                birthdayEmbed = makeEmbed({
                    title: 'Birthday added',
                    description: `${user.username}'s birthday has been set to ${birthdayDate.toLocaleDateString()}`,
                });
            } else {
                birthdayEmbed = makeEmbed({
                    title: 'Birthday add failed',
                    description: 'You must specify a user and a birthday',
                });
            }
        } else if (args[0] === 'remove') {
            const user = msg.mentions.users.first();

            if (user) {
                const guildId = msg.guild.id;
                const userId = user.id;

                await conn.models.Birthday.deleteOne({ userId, guildId });

                birthdayEmbed = makeEmbed({
                    title: 'Birthday removed',
                    description: `${user.username}'s birthday has been removed`,
                });
            } else {
                birthdayEmbed = makeEmbed({
                    title: 'Birthday remove failed',
                    description: 'You must specify a user',
                });
            }
        } else if (args[0] === 'list') {
            const guildID = msg.guild.id;

            const birthdays = await conn.models.Birthday.find({ guildID });

            console.log(birthdays);

            const members = await msg.guild.members.fetch();
            
            const birthdayList = birthdays.map(({ userID, birthday }) => `${members.get(userID).displayName}: ${birthday.toLocaleDateString()}`);

            birthdayEmbed = makeEmbed({
                title: 'Birthday list',
                description: birthdayList.length > 0 ? birthdayList.join('\n') : "No birthdays set",
            });
        } else {
            birthdayEmbed = makeEmbed({
                title: 'Birthday help',
                description: 'Birthday commands:',
                fields: [
                    {
                        name: 'add <user> <birthday>',
                        value: 'Adds a birthday reminder for the specified user',
                    },
                    {
                        name: 'remove <user>',
                        value: 'Removes a birthday reminder for the specified user',
                    },
                ],
            });
        }

        return msg.channel.send({ embeds: [birthdayEmbed] });

        const birthdays = await conn.models.Birthday.find();
        console.log(birthdays);
    },
};
