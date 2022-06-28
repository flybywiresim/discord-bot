import { User } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../../lib/command';
import { Roles, CommandCategory } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];

const noConnEmbed = makeEmbed({
    title: 'Warn - No Connection',
    description: 'Could not connect to the database',
    color: 'RED',
});

const noPermEmbed = makeEmbed({
    title: 'Warn',
    description: 'You do not have permission to use this command.',
    color: 'RED',
});

export const listWarnings: CommandDefinition = {
    name: ['warnings', 'listwarn', 'listwarnings'],
    requiredPermissions: ['BAN_MEMBERS'],
    description: 'Returns warnings for a user',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();

        if (!conn) {
            await msg.channel.send({ embeds: [noConnEmbed] });
            return;
        }

        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));
        const args = msg.content.split(/\s+/).slice(1);

        if (!hasPermittedRole) {
            await msg.channel.send({ embeds: [noPermEmbed] });
            return;
        }
        if (args.length < 1 && parseInt(args[1]) !== 0) {
            await msg.reply('You need to provide the following arguments for this command: <id>');
            return;
        }

        const id = args[0];
        const targetUser = await msg.guild.members.fetch(id);
        const userID = targetUser.user.id;

        const results = await conn.models.Warn.find({ userID });

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
                icon_url: user.displayAvatarURL({ dynamic: true }),
            },
            description: fields.length > 0 ? null : 'No Warnings',
            fields,
            footer: { text: `UserID: ${userID}` },
        });

        await msg.channel.send({ embeds: [warnEmbed(targetUser.user)] });
    },
};
