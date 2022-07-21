import { Client, Colors, Guild, TextChannel } from 'discord.js';
import { makeEmbed } from '../lib/embed';
import Logger from '../lib/logger';
import { GuildID, Channels } from '../constants';
import { getConn } from '../lib/db';
import Birthday from '../lib/schemas/birthdaySchema';

let birthdayInterval;

const gifs: string[] = [
    'https://c.tenor.com/rngI-iARtUsAAAAC/happy-birthday.gif',
    'https://c.tenor.com/VMC8fNKdQrcAAAAd/happy-birthday-bon-anniversaire.gif',
    'https://c.tenor.com/ZVG_H1ebQ88AAAAC/hbd-happy.gif',
    'https://c.tenor.com/xRSLl2b1NtkAAAAd/happy-birthday-wish.gif',
    'https://c.tenor.com/2v8fJf67VTkAAAAC/holiday-classics-elf.gif',
    'https://c.tenor.com/WcaloX5M08oAAAAC/kingsqueedgybot-meme.gif',
    'https://c.tenor.com/UwRRdD3mCQ0AAAAC/love-sis.gif',
    'https://c.tenor.com/5_VwBuyzBaAAAAAd/scream-happy-birthday.gif',
    'https://c.tenor.com/PZckaksfSQIAAAAC/lets-party.gif',
    'https://c.tenor.com/7fg9ogkiEmgAAAAC/happy-birthday-celebrating.gif',
    'https://c.tenor.com/dfL34nBDOrcAAAAC/happy-birthday.gif',
    'https://c.tenor.com/BiEt0CS2YLUAAAAd/happy-birthday-birthday.gif',
];

async function processBirthdays(client: Client) {
    // Get current date
    const currentDate = new Date();

    // Get new birthdays
    const birthdays = await Birthday.find({ utcDatetime: { $lt: currentDate } });

    // Bail if no birthdays
    if (!birthdays.length) {
        return;
    }

    // Get parent channel
    const guild = client.guilds.resolve(GuildID) as Guild | null;

    if (!guild) {
        Logger.error('Guild not found');
        return;
    }

    const channel = guild.channels.resolve(Channels.BIRTHDAY_CHANNEL) as TextChannel | null;

    // Bail if no channel
    if (!channel) {
        Logger.error('Birthday channel not found');
        return;
    }

    // Get all threads (archived included)
    await channel.threads.fetch({ archived: {} });

    const thread = channel.threads.cache.find((t) => t.id === Channels.BIRTHDAY_THREAD);

    if (!thread) {
        Logger.error('Birthday thread not found');
        return;
    }

    // Unarchive thread if needed
    if (thread.archived) {
        await thread.setArchived(false);
    }

    const conn = await getConn();

    if (!conn) {
        const noConnEmbed = makeEmbed({
            title: 'Error',
            description: 'Could not connect to database',
            color: Colors.Red,
        });
        await thread.send({ embeds: [noConnEmbed] });
        return;
    }

    // Send birthday messages
    for (const birthday of birthdays) {
        const user = guild.members.resolve(birthday.userID);

        // If the user is not found, we can't mention them
        if (!user) {
            continue;
        }

        // Happy birthday!
        const birthdayEmbed = makeEmbed({
            title: 'Happy Birthday!',
            description: `${user.displayName}'s birthday is today!`,
            color: Colors.Green,
            image: { url: gifs[Math.floor(Math.random() * gifs.length)] },
        });

        // Potential future consideration: handle birthdays that we missed? (bot outages, etc)

        // Update birthday to next year
        const nextBirthdayDatetime = new Date(Date.UTC(currentDate.getUTCFullYear() + 1, birthday.month - 1, birthday.day));
        nextBirthdayDatetime.setUTCHours(10 - birthday.timezone);

        birthday.utcDatetime = nextBirthdayDatetime;
        birthday.save();

        // Send the birthday message
        thread.send({ content: user.toString(), embeds: [birthdayEmbed] });
    }
}

module.exports = {
    event: 'ready',
    executor: async (client) => {
        birthdayInterval = setInterval(processBirthdays, 1000 * 60 * 60, client);

        // Remove the interval if the bot disconnects
        client.on('disconnect', () => {
            clearInterval(birthdayInterval);
        });
    },
};
