import mysql from 'mysql';
import birthdays from 'discord-birthdays';

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

setTimeout(async () => {
    let database;
    await database.utils.dbcheck(databaseConnect);
    await database.utils.init(databaseConnect, 'MM-DD', '832721829822857296', ['879012702222168064'], 'HAPPY BIRTHDAY');
}, 3000);
