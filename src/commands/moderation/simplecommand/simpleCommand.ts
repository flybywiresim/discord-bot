import { Colors, EmbedField, TextChannel } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../../lib/command';
import { Roles, Channels, CommandCategory } from '../../../constants';
import { makeEmbed, makeLines } from '../../../lib/embed';
import { getConn } from '../../../lib/db';
import SimpleCommand from '../../../lib/schemas/simpleCommandSchema';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
];

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Simple Command - Help',
    description: 'A command to manage simple commands that consist of a Title, Content and Color. This can be used to create temporary commands for different purposes.',
    fields: [
        {
            name: 'Adding a Simple Command',
            value: makeLines([
                'To create a simple command, run the following bot command: ',
                `\`${evokedCommand} add <command> <severity> <title> <content>\`.`,
                '`command`: The command to be created that can be executed by regular users.',
                '`severity`: The type can be `info`, `warning`, `warn`, `error` or `err`. Depending on the severity, the command output will have an appropriate color: regular, yellow or red.',
                '`title`: A double quote (`"`) encapsulated string used as the title of the bot message.',
                '`content`: A double quote (`"`) encapsulated string used as the content of the bot message.',
                'Example:',
                `\`${evokedCommand} add exp-bad-build warn "Experimental build broken" "The Experimental build is broken where the displays do not show. A fix is being actively developed."\``,
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'List existing Simple Commands',
            value: makeLines([
                'To list the existing simple commands, run the following bot command: ',
                `\`${evokedCommand} list [search]\`.`,
                '`search`: Optional parameter to filter the Simple Commands based on command (it results in a `*[search]*` wildcard match).',
                'Example:',
                `\`${evokedCommand} list bad`,
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'Delete existing Simple Command',
            value: makeLines([
                'To delete a simple command, run the following bot command: ',
                `\`${evokedCommand} delete <command>\`.`,
                '`command`: The command to delete, needs to be an exact match.',
                'Example:',
                `\`${evokedCommand} exp-bad-build\``,
            ]),
            inline: false,
        },
    ],
});

const successEmbed = (action: string, command: string) => makeEmbed({
    title: `Simple Command - ${action} Success - ${command}`,
    color: Colors.Green,
});

const listEmbed = (fields: EmbedField[], count: number) => makeEmbed({
    title: 'Simple Command - List',
    description: `List of ${count} Simple command(s) matching the search (maximum of 10).`,
    fields,
});

const failedEmbed = (action: string, command: string) => makeEmbed({
    title: `Simple Command - ${action} failed`,
    description: `Failed to ${action} the simple command "${command}", change not saved to mongoDB.`,
    color: Colors.Red,
});

const modLogEmbed = (action: string, command: string, fields: any) => makeEmbed({
    title: `Simple Command - ${action} - ${command}`,
    fields,
    color: Colors.Red,
});

const alreadyExistsEmbed = (action: string, command: string) => makeEmbed({
    title: `Simple Command - ${action} - ${command} already exists`,
    description: `The Simple Command "${command}" already exists, please use a different command.`,
    color: Colors.Red,
});

const missingInfoEmbed = (action: string, information: string) => makeEmbed({
    title: `Simple Command - ${action} - missing information`,
    description: `${information}.`,
    color: Colors.Red,
});

const noConnEmbed = makeEmbed({
    title: 'Simple Command - No Connection',
    description: 'Could not connect to the database.',
    color: Colors.Red,
});

const noModLogsEmbed = (action:string) => makeEmbed({
    title: `Simple Command - ${action} - No Mod Log`,
    description: 'The command was successful, but no mod log was sent. Please check the channel still exists.',
    color: Colors.Yellow,
});

const noPermEmbed = makeEmbed({
    title: 'Simple Command - Permission missing',
    description: 'You do not have permission to use this command.',
    color: Colors.Red,
});

const notFoundEmbed = (action: string, command: string) => makeEmbed({
    title: `Simple Command - ${action} - ${command} not be found`,
    description: 'No Simple Command(s) matching the search can be found.',
    color: Colors.Red,
});

const simpleCommandEmbedField = (date: string, moderator: string, command: string, severity: string, title: string, content: string): EmbedField[] => [
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
        name: 'Severity',
        value: severity,
    },
    {
        inline: true,
        name: 'Date',
        value: date,
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

export const simplecommand: CommandDefinition = {
    name: ['simplecommand', 'simplecommands'],
    requiredPermissions: ['BanMembers'],
    description: 'Creates a simple command for temporary use.',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();
        if (!conn) {
            await msg.channel.send({ embeds: [noConnEmbed] });
            return;
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
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

        const subCommand = args[0];
        const subArgs = args.slice(1).join(' ');
        if (subCommand === 'add') {
            const regexCheck = /^["]?\.?(?<command>[\w-]+)["]?\s["]?(?<severity>info|warning|error)["]?\s"(?<title>[^"]*|^[^"]*$)"\s"(?<content>[^"]*|^[^"]*$)"\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.command || !regexMatches.groups.severity) {
                await msg.channel.send({ embeds: [missingInfoEmbed('Add', `You need to provide the expected format to create a simple command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }
            if (regexMatches.groups.title === '') {
                await msg.channel.send({ embeds: [missingInfoEmbed('Add', `You need to provide a non-empty title to create a simple command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }
            if (regexMatches.groups.content === '') {
                await msg.channel.send({ embeds: [missingInfoEmbed('Add', `You need to provide a non-empty content to create a simple command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }
            const { command, content, title, severity } = regexMatches.groups;
            const searchResult = await SimpleCommand.find({ command });

            if (searchResult.length !== 0) {
                await msg.channel.send({ embeds: [alreadyExistsEmbed('Add', command)] });
                return;
            }

            const moderator = msg.author;
            const date = moment(new Date()).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
            const simpleCommand = new SimpleCommand({
                command,
                moderator,
                content,
                date,
                title,
                severity,
            });

            try {
                await simpleCommand.save();
            } catch {
                await msg.channel.send({ embeds: [failedEmbed('Add', command)] });
                return;
            }

            try {
                await modLogsChannel.send({ embeds: [modLogEmbed('Add', command, simpleCommandEmbedField(date, moderator.toString(), command, severity, title, content))] });
            } catch {
                await msg.channel.send({ embeds: [noModLogsEmbed('Add')] });
                return;
            }

            await msg.channel.send({ embeds: [successEmbed('Add', command)] });
            return;
        }

        if (subCommand === 'list') {
            const regexCheck = /^["]?(?<search>[\w-]+)?["]?\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            const searchRegex = regexMatches.groups.search ? new RegExp(regexMatches.groups.search) : null;
            const simpleCommands = searchRegex ? await SimpleCommand.find({ command: searchRegex }) : await SimpleCommand.find();

            const fields: EmbedField[] = simpleCommands.sort((a, b) => a.command.localeCompare(b.command)).map((simpleCommand) => {
                const { command, moderator, content, date, title, severity } = simpleCommand;
                const dateString = moment(date).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
                return simpleCommandEmbedField(dateString, moderator, command, severity, title, content);
            }).slice(0, 10).flat();

            if (simpleCommands.length > 0) {
                await msg.channel.send({ embeds: [listEmbed(fields, simpleCommands.length)] });
                return;
            }
            if (searchRegex) {
                await msg.channel.send({ embeds: [notFoundEmbed('List', regexMatches.groups.search)] });
                return;
            }
            await msg.channel.send({ embeds: [notFoundEmbed('List', '')] });
        }

        if (subCommand === 'delete') {
            const regexCheck = /^["]?(?<command>[\w-]+)?["]?\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (!regexMatches.groups.command) {
                await msg.channel.send({ embeds: [missingInfoEmbed('Delete', `You need to provide the expected format to delete a simple command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }

            const { command } = regexMatches.groups;
            let simpleCommands = [];
            try {
                simpleCommands = await SimpleCommand.find({ command });
                if (!simpleCommands || simpleCommands.length !== 1) {
                    await msg.channel.send({ embeds: [notFoundEmbed('Delete', command)] });
                    return;
                }
            } catch {
                await msg.channel.send({ embeds: [notFoundEmbed('Delete', command)] });
                return;
            }

            try {
                simpleCommands[0].delete();
            } catch {
                await msg.channel.send({ embeds: [failedEmbed('Delete', command)] });
                return;
            }

            try {
                const { moderator, content, date, title, severity } = simpleCommands[0];
                const dateString = moment(date).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');
                await modLogsChannel.send({ embeds: [modLogEmbed('Delete', command, simpleCommandEmbedField(dateString, moderator.toString(), command, severity, title, content))] });
            } catch {
                await msg.channel.send({ embeds: [noModLogsEmbed('Delete')] });
                return;
            }

            await msg.channel.send({ embeds: [successEmbed('Delete', command)] });
        }
    },
};
