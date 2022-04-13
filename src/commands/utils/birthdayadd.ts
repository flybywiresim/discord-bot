import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { databaseConnect, dbcheck } from '../../handlers/birthdayhandler';

export const birthdayadd: CommandDefinition = {
    name: 'bdayadd',
    description: 'Initiates the birthday command to add a birthday',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const addEmbed = makeEmbed({
            title: 'Birthday Added!',
            description: 'Birthday successfully added!',
        });
        dbcheck(databaseConnect.database);
        await msg.channel.send({ embeds: [addEmbed] });
        console.log(dbcheck(databaseConnect.database));
    },
};
