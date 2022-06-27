import { CommandDefinition } from '../../../lib/command';
import { Roles, CommandCategory } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';
import { User } from 'discord.js';
import moment from 'moment';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];

const noPermEmbed = makeEmbed({
    title: 'Warn',
    description: 'You do not have permission to use this command.',
    color: 'RED',
});

export const warnings: CommandDefinition = {
    name: 'warnings',
    requiredPermissions: ['BAN_MEMBERS'],
    description: 'Returns warnings for a user',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();

        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));

        const args = msg.content.split(/\s+/)
            .slice(1);

        if (!hasPermittedRole) {
            await msg.channel.send({ embeds: [noPermEmbed] })
        } else if (args.length < 1 && parseInt(args[1]) !== 0) {
            return msg.reply('You need to provide the following arguments for this command: <id>');
        } else {
            const id = args[0];
            const targetUser = await msg.guild.members.fetch(id);
            const userID = targetUser.user.id;

            const results = await conn.models.Warn.find({ userID });
            console.log(results)

            const fields = [];

            for (const warns of results) {

                const formattedDate: string = moment(warns.date).utcOffset(0).format("DD, MM, YYYY, HH:mm:ss");

                fields.push({
                    name: `${formattedDate}`,
                    value: `Moderator: ${warns.moderator}\nReason: ${warns.reason}`,
                });
            }
            const warnEmbed = (user: User) => makeEmbed({
                author: {
                    name: `${user.tag}'s warnings`,
                    icon_url: user.displayAvatarURL({ dynamic: true }),
                },
                description: fields.length > 0 ? null : 'No Warnings',
                fields,
                footer: { text: `UserID: ${userID}` },
            });

            await msg.channel.send({ embeds: [warnEmbed(targetUser.user)] });
        }
    }
}







