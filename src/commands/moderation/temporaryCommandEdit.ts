import { Colors, EmbedField, TextChannel } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { Roles, Channels, CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';
import { getConn } from '../../lib/db';
import TemporaryCommand from '../../lib/schemas/temporaryCommandSchema';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Manage Temporary Commands - Help',
    description: 'A command to manage temporary commands that consist of a Title, Content and Color. This can be used to create temporary commands for different purposes.',
    fields: [
        {
            name: 'Adding a Temporary Command',
            value: makeLines([
                'To create a temporary command, use the following bot command: ',
                `\`${evokedCommand} add <command> <severity> <title> <content>\`.`,
                '`command`: The command to be created that can be executed by regular users.',
                '`severity`: The type can be `info`, `warning`, or `error`. Depending on the severity, the command output will have an appropriate color: regular, yellow or red.',
                '`title`: A double quote (`"`) encapsulated string used as the title of the bot message.',
                '`content`: A double quote (`"`) encapsulated string used as the content of the bot message.',
                'Example:',
                `\`${evokedCommand} add good-news-everyone info "Good News Everyone!" "The Experimental version is the greatest in the world!"\``,
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'Show info about a Temporary Command',
            value: makeLines([
                'To show info about an existing temporary command with logging details, use the following bot command: ',
                `\`${evokedCommand} info <command>\``,
                '`command`: Which command to show the details for.',
                'Example:',
                `\`${evokedCommand} info good-news-everyone\``,
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'List existing Temporary Commands',
            value: makeLines([
                'To list the existing temporary commands, use the following bot command (Note the different command!): ',
                '`.tc list [search]`',
                '`search`: Optional parameter to filter the Temporary Commands listed based a search value (it results in a `*[search]*` wildcard match).',
                'Example:',
                '`.tc list good`',
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'Delete existing Temporary Command',
            value: makeLines([
                'To delete a temporary command, use the following bot command: ',
                `\`${evokedCommand} delete <command>\``,
                '`command`: The command to delete, needs to be an exact match.',
                'Example:',
                `\`${evokedCommand} delete good-news-everyone\``,
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'Command aliases',
            value: '`.temporarycommandedit`, `.tempcommandedit`, `.tcedit`, `.tcmod`',
            inline: false,
        },
    ],
});

const successEmbed = (action: string, command: string) => makeEmbed({
    title: `Temporary Command - ${action} Success - ${command}`,
    color: Colors.Green,
});

const infoEmbed = (fields: EmbedField[], command: string) => makeEmbed({
    title: `Temporary Command - Info - ${command}`,
    fields,
});

const failedEmbed = (action: string, command: string) => makeEmbed({
    title: `Temporary Command - ${action} failed`,
    description: `Failed to ${action} the temporary command "${command}", change not saved to mongoDB.`,
    color: Colors.Red,
});

const channelEmbed = (action: string, command: string, fields: any, color: number) => makeEmbed({
    title: `Temporary Command - ${action} - ${command}`,
    fields,
    color,
});

const alreadyExistsEmbed = (action: string, command: string) => makeEmbed({
    title: `Temporary Command - ${action} - ${command} already exists`,
    description: `The Temporary Command "${command}" already exists, please use a different command.`,
    color: Colors.Red,
});

const missingInfoEmbed = (action: string, information: string) => makeEmbed({
    title: `Temporary Command - ${action} - missing information`,
    description: `${information}.`,
    color: Colors.Red,
});

const noChannelEmbed = (action:string, channel: string) => makeEmbed({
    title: `Temporary Command - ${action} - No ${channel} channel`,
    description: `The command was successful, but no ${channel} was sent. Please check the channel still exists.`,
    color: Colors.Yellow,
});

const noConnEmbed = makeEmbed({
    title: 'Temporary Command - No Connection',
    description: 'Could not connect to the database.',
    color: Colors.Red,
});

const noPermEmbed = makeEmbed({
    title: 'Temporary Command - Permission missing',
    description: 'You do not have permission to use this command.',
    color: Colors.Red,
});

const notFoundEmbed = (action: string, command: string) => makeEmbed({
    title: `Temporary Command - ${action} - ${command} not found`,
    description: 'No Temporary Command(s) matching the search can be found.',
    color: Colors.Red,
});

const temporaryCommandSupportEmbedField = (command: string, severity: string, title: string, content: string): EmbedField[] => [
    {
        inline: true,
        name: 'Command',
        value: command,
    },
    {
        inline: true,
        name: 'Severity',
        value: severity,
    },
    {
        inline: true,
        name: 'Title',
        value: title,
    },
    {
        inline: false,
        name: 'Content',
        value: content,
    },
];

const temporaryCommandEmbedField = (date: string, moderator: string, command: string, severity: string, title: string, content: string): EmbedField[] => [
    {
        inline: false,
        name: 'Command',
        value: command,
    },
    {
        inline: true,
        name: 'Moderator',
        value: moderator,
    },
    {
        inline: true,
        name: 'Date',
        value: date,
    },
    {
        inline: true,
        name: 'Severity',
        value: severity,
    },
    {
        inline: false,
        name: 'Title',
        value: title,
    },
    {
        inline: false,
        name: 'Content',
        value: content,
    },
];

export const temporarycommandedit: CommandDefinition = {
    name: ['temporarycommandedit', 'tempcommandedit', 'tcedit', 'tcmod'],
    description: 'Creates a temporary command for temporary use.',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();
        if (!conn) {
            await msg.channel.send({ embeds: [noConnEmbed] });
            return;
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const supportOpsChannel = msg.guild.channels.resolve(Channels.SUPPORT_OPS) as TextChannel | null;
        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));
        const evokedCommand = msg.content.split(/\s+/)[0];
        const args = msg.content.split(/\s+/).slice(1);
        if (!hasPermittedRole) {
            await msg.channel.send({ embeds: [noPermEmbed] });
            return;
        }
        if ((args.length < 1 && parseInt(args[1]) !== 0) || args[0] === 'help') {
            await msg.channel.send({ embeds: [helpEmbed(evokedCommand)] });
            return;
        }

        let subCommand = args[0].toLowerCase();
        let subArgs = args.slice(1).join(' ');
        if (subCommand !== 'add' && subCommand !== 'delete' && subCommand !== 'info') {
            subCommand = 'info';
            [subArgs] = args;
        }
        if (subCommand === 'add') {
            const regexCheck = /^["]?\.?(?<command>[\w-]+)["]?\s["]?(?<severity>info|warning|error)["]?\s"(?<title>[^"]*|^[^"]*$)"\s"(?<content>[^"]*|^[^"]*$)"\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.command || !regexMatches.groups.severity) {
                await msg.channel.send({ embeds: [missingInfoEmbed('Add', `You need to provide the expected format to create a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }
            if (regexMatches.groups.title === '') {
                await msg.channel.send({ embeds: [missingInfoEmbed('Add', `You need to provide a non-empty title to create a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }
            if (regexMatches.groups.content === '') {
                await msg.channel.send({ embeds: [missingInfoEmbed('Add', `You need to provide a non-empty content to create a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }
            const { command, content, title, severity } = regexMatches.groups;
            const searchResult = await TemporaryCommand.find({ command });

            if (searchResult.length !== 0) {
                await msg.channel.send({ embeds: [alreadyExistsEmbed('Add', command)] });
                return;
            }

            const moderator = msg.author;
            const date = moment(new Date()).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
            const temporaryCommand = new TemporaryCommand({
                command,
                moderator,
                content,
                date,
                title,
                severity,
            });

            try {
                await temporaryCommand.save();
            } catch {
                await msg.channel.send({ embeds: [failedEmbed('Add', command)] });
                return;
            }

            try {
                await modLogsChannel.send({ embeds: [channelEmbed('Add', command, temporaryCommandEmbedField(date, moderator.toString(), command, severity, title, content), Colors.Green)] });
            } catch {
                await msg.channel.send({ embeds: [noChannelEmbed('Add', 'Mod Log')] });
            }

            try {
                await supportOpsChannel.send({ embeds: [channelEmbed('Add', command, temporaryCommandSupportEmbedField(command, severity, title, content), Colors.Green)] });
            } catch {
                await msg.channel.send({ embeds: [noChannelEmbed('Add', 'Support')] });
            }

            await msg.channel.send({ embeds: [successEmbed('Add', command)] });
            return;
        }

        const regexCheck = /^["]?\.?(?<command>[\w-]+)?["]?.*$/;
        const regexMatches = subArgs.match(regexCheck);
        if (!regexMatches || !regexMatches.groups || !regexMatches.groups.command) {
            const subCommandText = subCommand === 'info' ? 'show the info of' : subCommand;
            await msg.channel.send({ embeds: [missingInfoEmbed(subCommand, `You need to provide the expected format to ${subCommandText} a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
            return;
        }
        const { command } = regexMatches.groups;
        if (subCommand === 'info') {
            const searchResult = await TemporaryCommand.find({ command });

            if (searchResult.length === 0) {
                await msg.channel.send({ embeds: [notFoundEmbed('Info', command)] });
                return;
            }

            const { moderator, content, date, title, severity } = searchResult[0];
            const dateString = moment(date).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');

            await msg.channel.send({ embeds: [infoEmbed(temporaryCommandEmbedField(dateString, moderator, command, severity, title, content), command)] });
            return;
        }

        if (subCommand === 'delete') {
            let temporaryCommands = [];
            try {
                temporaryCommands = await TemporaryCommand.find({ command });
                if (!temporaryCommands || temporaryCommands.length !== 1) {
                    await msg.channel.send({ embeds: [notFoundEmbed('Delete', command)] });
                    return;
                }
            } catch {
                await msg.channel.send({ embeds: [notFoundEmbed('Delete', command)] });
                return;
            }

            try {
                temporaryCommands[0].delete();
            } catch {
                await msg.channel.send({ embeds: [failedEmbed('Delete', command)] });
                return;
            }

            const { moderator, content, date, title, severity } = temporaryCommands[0];
            try {
                const dateString = moment(date).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
                await modLogsChannel.send({ embeds: [channelEmbed('Delete', command, temporaryCommandEmbedField(dateString, moderator.toString(), command, severity, title, content), Colors.Red)] });
            } catch {
                await msg.channel.send({ embeds: [noChannelEmbed('Delete', 'Mod Log')] });
            }

            try {
                await supportOpsChannel.send({ embeds: [channelEmbed('Delete', command, temporaryCommandSupportEmbedField(command, severity, title, content), Colors.Red)] });
            } catch {
                await msg.channel.send({ embeds: [noChannelEmbed('Delete', 'Support')] });
            }

            await msg.channel.send({ embeds: [successEmbed('Delete', command)] });
        }
    },
};
