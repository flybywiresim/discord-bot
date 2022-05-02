import { Client, DMChannel, TextChannel } from 'discord.js';
import { makeEmbed } from '../lib/embed';
import Logger from '../lib/logger';
import { GuildID, Channels } from '../constants';
import { getConn } from '../lib/db';

async function processBirthdays(client: Client)
{
    const conn = await getConn();

    if(!conn)
    {
        return;
    }

    const currentDate = new Date();

    const birthdays = await conn.models.Birthday.find({
        day: currentDate.getDate() + 1,
        month: currentDate.getMonth() + 1,
        lastYear:
        {
            $lt: currentDate.getFullYear(),
        },
    });

    for (const birthday of birthdays) {
        const guild = await client.guilds.fetch(GuildID);
        const channel = guild.channels.resolve(Channels.BIRTHDAY_THREAD) as TextChannel;

        // If the channel is not found, we can't send a message
        if (!channel) {
            continue;
        }

        const user = await guild.members.fetch(birthday.userID);
        
        // If the user is not found, we can't mention them
        if (!user) {
            continue;
        }

        const birthdayEmbed = makeEmbed({
            title: 'Birthday reminder',
            description: `${user.displayName}'s birthday is today!`,
            color: 'GREEN',
        });

        // Update the last year announced
        birthday.lastYear = currentDate.getFullYear();
        await birthday.save();

        // Send the birthday message
        await channel.send({ embeds: [birthdayEmbed] });
    }
}

module.exports = {
    event: 'ready',
    executor: async (client) => {
        setInterval(processBirthdays, 1000 * 15, client);
    }
};