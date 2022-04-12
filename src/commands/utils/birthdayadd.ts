import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { database } from '../../handlers/mysqldb';
// import moment from 'moment';

export const birthdayadd: CommandDefinition = {
    name: 'bdayadd',
    description: 'Initiates the birthday command to add a birthday',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        setTimeout(async () => {
            await database.utils.dbcheck(database.connect);
            await database.utils.init(database.connect, 'MM-DD', '832721829822857296', ['198174874479362048'], 'Happy Birthday!', '#00E0FE');
        }, 3000);

        const addEmbed = makeEmbed({
            title: 'Birthday Added!',
            description: 'Birthday successfully added!',
        });

        // const errorEmbed = makeEmbed({
        //     title: 'Error',
        //     description: 'Failed to add Birthday',
        // });

        database.utils.addbday(msg.author.id);
        await msg.channel.send({ embeds: [addEmbed] });
    },
};
