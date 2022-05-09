import { CommandDefinition } from '../../lib/command';
import { Roles, CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { getConn } from '../../lib/db';
import { Channels } from '../../constants';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
    Roles.DEVELOPMENT_TEAM,
    Roles.MEDIA_TEAM,
    Roles.FBW_EMERITUS,
];

export const birthday: CommandDefinition = {
    name: 'birthday',
    description: 'Manages birthday reminders',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        // Allow commands only in birthday thread
        if(msg.channel.id != Channels.BIRTHDAY_THREAD)
        {
            return;
        }

        const conn = await getConn();
        const args: string[] = msg.content.split(' ').slice(1);

        let birthdayEmbed;

        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map(r => r.toString()).includes(role.id));

        if (!hasPermittedRole) {
            birthdayEmbed = makeEmbed({
                title: 'Birthday reminder',
                description: 'You do not have permission to use this command.',
                color: 'RED',
            });
        } else {
            if (args[0] === 'add' || args[0] === 'set') {
                const user = msg.mentions.users.first();

                if (!user) {
                    birthdayEmbed = makeEmbed({
                        title: 'Birthday reminder',
                        description: 'You need to mention a user to add a birthday reminder',
                        color: 'RED',
                    });
                } else {
                    let birthdayDay;
                    let birthdayMonth;

                    let birthdayStrings = args.slice(2).join('/').split(/[\/-]/);

                    // Catch invalid dates
                    if (birthdayStrings.length < 2) {
                        birthdayEmbed = makeEmbed({
                            title: 'Birthday reminder',
                            description: 'Insufficient args provided. Please use `.birthday add <user> <month>/<day>`',
                            color: 'RED',
                        });
                    } else {
                        birthdayDay = parseInt(birthdayStrings[1]);
                        birthdayMonth = parseInt(birthdayStrings[0]);

                        if (isNaN(birthdayDay) || isNaN(birthdayMonth)) {
                            birthdayEmbed = makeEmbed({
                                title: 'Birthday reminder',
                                description: 'Invalid date format. Please use `.birthday add <user> <month>/<day>`',
                                color: 'RED',
                            });
                        } else {
                            const userID = user.id;

                            let birthdayDoc = await conn.models.Birthday.findOne({ userID: userID });
                            
                            if (birthdayDoc) {
                                birthdayDoc.day = birthdayDay;
                                birthdayDoc.month = birthdayMonth;
                            } else {
                                birthdayDoc = new conn.models.Birthday({
                                    userID: userID,
                                    day: birthdayDay,
                                    month: birthdayMonth,
                                    lastYear: 0,
                                });
                            }
                            
                            birthdayEmbed = makeEmbed({
                                title: 'Birthday added',
                                description: `${user.username}'s birthday has been set to ${birthdayMonth}/${birthdayDay}`,
                            });

                            await birthdayDoc.save();
                        }
                    }
                }
            } else if (args[0] === 'remove') {
                const user = msg.mentions.users.first();

                if (user) {
                    const userID = user.id;

                    await conn.models.Birthday.deleteOne({ userID });

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
                const birthdays = await conn.models.Birthday.find({});
                const members = await msg.guild.members.fetch();
                
                let birthdayList: Array<String> = [];
                
                for (const birthday of birthdays) {
                    const member = members.get(birthday.userID);

                    if (member) {
                        birthdayList.push(`${member.displayName} - ${birthday.month}/${birthday.day}`);
                    }
                }

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
                        {
                            name: 'list',
                            value: 'Lists all birthday reminders',
                        },
                    ],
                });
            }
        }

        return msg.channel.send({ embeds: [birthdayEmbed] });
    },
};