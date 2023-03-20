import { Colors, User } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../../lib/command';
import { CommandCategory, RoleGroups } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';
import Warn from '../../../lib/schemas/warnSchema';

const noConnEmbed = makeEmbed({
    title: 'Warn - No Connection',
    description: 'Could not connect to the database',
    color: Colors.Red,
});

export const listWarnings: CommandDefinition = {
    name: ['warnings', 'listwarn', 'listwarnings', 'warns'],
    requirements: { roles: RoleGroups.STAFF },
    description: 'Returns warnings for a user',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();

        if (!conn) {
            await msg.reply({ embeds: [noConnEmbed] });
            return;
        }

        const args = msg.content.split(/\s+/).slice(1);

        if (args.length < 1 && parseInt(args[1]) !== 0) {
            await msg.reply('You need to provide the following arguments for this command: <id>');
            return;
        }

        const id = args[0];
        const targetUser = await msg.guild.members.fetch(id);
        const userID = targetUser.user.id;

        const results = await Warn.find({ userID });

        const fields = [];
        for (const warns of results) {
            const formattedDate: string = moment(warns.date).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');

            fields.push({
                name: `__${formattedDate}__`,
                value: `**Moderator:** ${warns.moderator}\n**Reason:** ${warns.reason}\n**Warn ID:** ${warns.id}`,
            });
        }

        const warnEmbed = (user: User) => makeEmbed({
            author: {
                name: `${user.tag}'s warnings`,
                iconURL: user.displayAvatarURL(),
            },
            description: fields.length > 0 ? null : 'No Warnings',
            fields,
            footer: { text: `UserID: ${userID}` },
        });

        await msg.reply({ embeds: [warnEmbed(targetUser.user)] });
    },
};
