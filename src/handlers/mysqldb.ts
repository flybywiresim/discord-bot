import mysql from 'mysql';

export const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'birthday_database',
});

database.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the birthday database!');
    }
});

// setTimeout(async () => {
//     await database.utils.dbcheck(database);
//     await database.utils.init(database, 'MM-DD', '832721829822857296', ['879012702222168064'], 'HAPPY BIRTHDAY', 'Happy Birthday', '#ffffff');
// }, 3000);
