import Discord from 'discord.js';
import mysql from 'mysql';
import moment from 'moment-timezone';

export const databaseConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'birthday_database',
});

databaseConnect.connect((err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    } else {
        // eslint-disable-next-line no-console
        console.log('Connected to the birthday database!');
    }
});

export async function dbcheck(con) {
    await con.query(`SELECT * FROM birthdays`, async (err, row) => {
        if (err) {
            await con.query('CREATE TABLE birthdays ( userid TEXT, deDate TEXT );', async (err, row) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log('Birthdays Issue Importing Table: ', err);
                } else {
                    // eslint-disable-next-line no-console
                    console.log('Imported Birthdays Table.');
                }
            });
        }
    });
}

export async function init(con, client, format, guildid, channels, header, footer, color) {
    setInterval(async () => {
        // Get current date
        const datetime = moment().tz('America/New_York').format(format).toString()
        // Select all from table
        await con.query(`SELECT * FROM birthdays`, async (err, rows) => {
            if (err) throw err; // throw err
            if (rows[0]) { // if there is any data
                rows.forEach(async r => { // go through each bit of data
                    if (r.deDate.toString().includes(datetime)) { // If there birthday is equal to the current date
                        const guild = await client.guilds.cache.get(guildid) // find guild id
                        const user = await client.users.fetch(r.userid) // find user
                        if (guild.members.cache.get(user.id)) { // if the member is in the server
                            const bdayembed = new Discord.MessageEmbed() // create embed
                                .setColor(color || `#00E0FE`)
                                .setTitle(header || '🥳 Happy Birthday!')
                                .setThumbnail(user.avatarURL({ dynamic: true }) || `https://images.emojiterra.com/google/android-11/512px/1f389.png`)
                                .setDescription(`It's **${user.tag} (<@${user.id}>)'s** Birthday today! Wish them a happy birthday and let's celebrate!\n**Date:** ${r.deDate}`)
                                .setTimestamp()
                                .setFooter(footer || 'Happy Birthday!')
                            channels.forEach(async c => { // get each channel
                                let thechannel = await client.channels.cache.get(c)
                                if (thechannel !== undefined) {
                                    thechannel.send({ embeds: [bdayembed] }).catch(e => {}) // send to each channel
                                } else {
                                    console.log('A Birthday system channel ID is invalid...') // log error
                                }
                            });
                        }
                    }
                });
            }
        });
    }, 120000) // Every  46.8 minmutes (avoids double pings)
}

export async function addbday (con, userid, date) {
    await con.query(`SELECT * FROM birthdays WHERE userid='${userid}'`, async (err, row) => {
        if(err) {
            console.log(`Failed to import birthday for userid ${userid} with date ${date}`);
            return false;
        }
        if(!row[0]) {
            await con.query(`INSERT INTO birthdays (userid, deDate) VALUES ("${userid}", "${date}")`, async (err, row) => {
                if(err) {
                    console.log(`Failed to import birthday for userid ${userid} with date ${date}`);
                    return false;
                } else {
                    return true;
                }
            });
        }
    });
}

export async function removebday (con, userid) {
    await con.query(`SELECT * FROM birthdays WHERE userid='${userid}'`, async (err, row) => {
        if(err) {
            console.log(`Failed to delete birthday for userid ${userid}`);
            return false;
        }
        if (row[0]) {
            await con.query(`DELETE FROM birthdays WHERE userid='${userid}'`, async (err, row) => {
                if(err) {
                    console.log(`Failed to delete birthday for userid ${userid}`);
                    return false;
                } else {
                    return true;
                }
            });
        }
    });
}
