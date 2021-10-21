import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const roleinfo: CommandDefinition = {
    name: 'roleinfo',
    description: 'Lists the guild\'s current amount of members',
    category: CommandCategory.PUBLIC,
    executor: (msg) => {
        // Takes out the .roleinfo from the query;
        const query = msg.content.replace(/\.roleinfo(\s|$)+/, '').toLowerCase();

        if (query.length < 1) {
            msg.reply('you did not provide a role to search. (<role>)');
            return Promise.resolve();
        }

        // Checks the query against the id and checks if the name contains the query
        const rolesCache = msg.guild.roles.cache;
        const role = rolesCache.find((role) => (
            role.name.toLowerCase().includes(query) || role.id === query
        ));

        if (!role) {
            msg.reply('Invalid Role');
            return Promise.resolve();
        }

        return msg.channel.send(makeEmbed({
            title: `${role.name}`,
            description: `**${role.members.size}** members have that role.`,
        }));
    },
};
