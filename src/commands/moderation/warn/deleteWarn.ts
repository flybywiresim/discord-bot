import moment from 'moment';
import { TextChannel } from 'discord.js';
import { CommandDefinition } from '../../../lib/command';
import { Roles, CommandCategory, Channels } from '../../../constants';
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

const noWarningEmbed = makeEmbed({
    title: 'Warn - No Warning',
    description: 'Could not find warning. Please check the `Warn ID`',
    color: 'RED',
});

const deleteFailedEmbed = makeEmbed({
    title: 'Warn - Failed',
    description: 'Warning could not be removed',
    color: 'RED',
});

const noModLogs = makeEmbed({
    title: 'Warn - No Mod Log',
    description: 'The warn was removed, but no mod log was sent. Please check the channel still exists',
    color: 'RED',
});

const deleteEmbed = makeEmbed({
    title: 'Warn - Removed',
    description: 'Warning has been removed',
    color: 'GREEN',
});

export const deleteWarn: CommandDefinition = {
    name: ['deletewarn', 'delwarn', 'deletewarning'],
    requiredPermissions: ['BAN_MEMBERS'],
    description: 'Delete a warning',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();
        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));
        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        const args = msg.content.split(/\s+/).slice(1);
        //Does user have permitted role?
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

            const results = await conn.models.Warn.find({ _id: args });
            console.log(results);

            const fields = [];
            for (const warns of results) {
                const formattedDate: string = moment(warns.date).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');
                fields.push({
                    name: 'Removed warning:',
                    value: `**User:** <@${warns.userID}>\n**Date:** ${formattedDate}\n**Moderator:** ${warns.moderator}\n**Reason:** ${warns.reason}\n**User ID:** ${warns.userID}\n**Warn ID:** ${warns.id}`,
                });
            }
            const modLogsEmbed = makeEmbed({
                title: 'Warn - Removed',
                description: `A warning has been remove by <@${msg.author}>`,
                fields,
                color: 'GREEN',
            });
            try {
                await conn.models.Warn.deleteOne({ _id: args });
            } catch {
                return msg.channel.send({ embeds: [deleteFailedEmbed] });
            }

            try {
                await modLogsChannel.send({ embeds: [modLogsEmbed] });
            } catch {
                return msg.channel.send({ embeds: [noModLogs] });
            }
            await msg.channel.send({ embeds: [deleteEmbed] });
        }
    },
};
