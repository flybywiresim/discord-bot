import moment from 'moment';
import { Colors, TextChannel } from 'discord.js';
import { CommandDefinition } from '../../../lib/command';
import { Roles, CommandCategory, Channels } from '../../../constants';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';
import Warn from '../../../lib/schemas/warnSchema';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];

const noConnEmbed = makeEmbed({
    title: 'Warn - No Connection',
    description: 'Could not connect to the database',
    color: Colors.Red,
});

const noPermEmbed = makeEmbed({
    title: 'Warn',
    description: 'You do not have permission to use this command.',
    color: Colors.Red,
});

const noWarningEmbed = makeEmbed({
    title: 'Warn - No Warning',
    description: 'Could not find warning. Please check the `Warn ID`',
    color: Colors.Red,
});

const deleteFailedEmbed = makeEmbed({
    title: 'Warn - Failed',
    description: 'Warning could not be removed',
    color: Colors.Red,
});

const noModLogs = makeEmbed({
    title: 'Warn - No Mod Log',
    description: 'The warn was removed, but no mod log was sent. Please check the channel still exists',
    color: Colors.Red,
});

const deleteEmbed = makeEmbed({
    title: 'Warn - Removed',
    description: 'Warning has been removed',
    color: Colors.Green,
});

export const deleteWarn: CommandDefinition = {
    name: ['deletewarn', 'delwarn', 'deletewarning'],
    requiredPermissions: ['BanMembers'],
    description: 'Delete a warning',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();

        if (!conn) {
            await msg.channel.send({ embeds: [noConnEmbed] });
            return;
        }

        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));
        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        const args = msg.content.split(/\s+/).slice(1);
        const warnId = args[0];

        if (!hasPermittedRole) {
            await msg.channel.send({ embeds: [noPermEmbed] });
            return;
        }

        if (args.length < 1 && parseInt(args[1]) !== 0) {
            await msg.reply('You need to provide the following arguments for this command: <Warn ID>');
            return;
        }

        try {
            const warn = await Warn.findById(warnId);

            if (!warn) {
                await msg.channel.send({ embeds: [noWarningEmbed] });
                return;
            }
        } catch {
            await msg.channel.send({ embeds: [noWarningEmbed] });
            return;
        }

        const results = await Warn.find({ _id: args });

        const fields = [];
        for (const warns of results) {
            const formattedDate: string = moment(warns.date).utcOffset(0).format('DD, MM, YYYY, HH:mm:ss');
            fields.push({
                name: 'Removed warning:',
                value: `**User:** <@${warns.userID}>\n**Date:** ${formattedDate}\n**Moderator:** ${warns.moderator}\n**Reason:** ${warns.reason}\n\n**User ID:** ${warns.userID}\n**Warn ID:** ${warns.id}`,
            });
        }

        const modLogsEmbed = makeEmbed({
            title: 'Warn - Removed',
            description: `A warning has been remove by <@${msg.author}>`,
            fields,
            color: Colors.Green,
        });

        try {
            await Warn.deleteOne({ _id: args });
        } catch {
            await msg.channel.send({ embeds: [deleteFailedEmbed] });
            return;
        }
        try {
            await modLogsChannel.send({ embeds: [modLogsEmbed] });
        } catch {
            await msg.channel.send({ embeds: [noModLogs] });
            return;
        }

        await msg.channel.send({ embeds: [deleteEmbed] });
    },
};
