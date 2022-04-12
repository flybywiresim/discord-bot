import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { database } from '../../handlers/mysqldb';

export const birthdayremove: CommandDefinition = {
    name: 'bdayremove',
    description: 'Initiates the birthday command to remove a birthday',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        setTimeout(async () => {
            await database.utils.dbcheck(database.connect);
            await database.utils.init(database.connect,'MM-DD', '832721829822857296', ['879012702222168064'], 'HAPPY BIRTHDAY', 'Happy BDay Lol', '#ffffff');
        }, 3000);

        const removeEmbed = makeEmbed({
            title: 'Birthday Removed',
            description: 'Birthday successfully removed.',
        });

        // const errorEmbed = makeEmbed({
        //     title: 'Error',
        //     description: 'Failed to remove birthday.',
        // });

        database.utils.addbday(msg.author.id);
        await msg.channel.send({ embeds: [removeEmbed] });
    },
};
