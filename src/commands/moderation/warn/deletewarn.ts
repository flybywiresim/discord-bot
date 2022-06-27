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
    title: 'Warn',
    description: 'Warning has been removed',
});

const removeFailed = makeEmbed({
    title: 'Warn',
    description: 'Waring could not be removed',
});

const noWarning = makeEmbed({
    title: 'Warn',
    description: 'Could not find warning, check `Warn ID`',
});

export const deletewarn: CommandDefinition = {
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
                await conn.models.Warn.findOne({ _id: args });
                try {
                    await conn.models.Warn.deleteOne({ _id: args });
                } catch {
                    return msg.channel.send({ embeds: [removeFailed] });
                }
            } catch {
                return msg.channel.send({ embeds: [noWarning] });
            }
            msg.channel.send({ embeds: [deleteEmbed] });
        }
    },
};
