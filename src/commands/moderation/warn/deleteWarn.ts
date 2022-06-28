import { CommandDefinition } from '../../../lib/command';
import { Roles, CommandCategory } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];

const noPermEmbed = makeEmbed({
    title: 'Warn',
    description: 'You do not have permission to use this command.',
    color: 'RED',
});

const deleteEmbed = makeEmbed({
    title: 'Warn - Removed',
    description: 'Warning has been removed',
    color: 'GREEN',
});

const deleteFailedEmbed = makeEmbed({
    title: 'Warn - Failed',
    description: 'Warning could not be removed',
    color: 'RED',
});

const noWarningEmbed = makeEmbed({
    title: 'Warn - No Warning',
    description: 'Could not find warning. Please check the `Warn ID`',
    color: 'RED',
});

export const deleteWarn: CommandDefinition = {
    name: 'deletewarn',
    requiredPermissions: ['BAN_MEMBERS'],
    description: 'Delete a warning',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();
        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));

        const args = msg.content.split(/\s+/).slice(1);

        if (!hasPermittedRole) {
            await msg.channel.send({ embeds: [noPermEmbed] });
        } else if (args.length < 1 && parseInt(args[1]) !== 0) {
            return msg.reply('You need to provide the following arguments for this command: <Warn ID>');
        } else {
            try {
                const check = await conn.models.Warn.find({ _id: args })
                    .count() > 0;
                console.log(check);
                if (check === false) {
                    return msg.channel.send({ embeds: [noWarningEmbed] });
                }
            } catch {
                return msg.channel.send({ embeds: [noWarningEmbed] });
            }
            try {
                await conn.models.Warn.deleteOne({ _id: args });
            } catch {
                return msg.channel.send({ embeds: [deleteFailedEmbed] });
            }
            msg.channel.send({ embeds: [deleteEmbed] });
        }
    },
};
