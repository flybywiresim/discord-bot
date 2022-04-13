import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { databaseConnect } from '../../handlers/mysqldb';

export const birthdayremove: CommandDefinition = {
    name: 'bdayremove',
    description: 'Initiates the birthday command to remove a birthday',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const removeEmbed = makeEmbed({
            title: 'Birthday Removed',
            description: 'Birthday successfully removed.',
        });

        // const errorEmbed = makeEmbed({
        //     title: 'Error',
        //     description: 'Failed to remove birthday.',
        // });

        databaseConnect.database.utils.addbday(msg.author.id);
        await msg.channel.send({ embeds: [removeEmbed] });
    },
};
