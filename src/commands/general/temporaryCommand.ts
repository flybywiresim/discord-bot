import { Colors, EmbedField, TextChannel } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory, Colors as FBWColors, Channels } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';
import { getConn } from '../../lib/db';
import TemporaryCommand from '../../lib/schemas/temporaryCommandSchema';

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Temporary Command - Help',
    description: 'A command to run temporary commands.',
    fields: [
        {
            name: 'Run a Temporary Command',
            value: makeLines([
                'To run a temporary command, use the following bot command: ',
                `\`${evokedCommand} <command>\`.`,
                '`command`: The command you want to run, needs to be an exact match.',
                'Example:',
                `\`${evokedCommand} good-news-everyone\``,
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'List existing Temporary Commands',
            value: makeLines([
                'To list the existing temporary commands, use the following bot command: ',
                `\`${evokedCommand} list [search]\``,
                '`search`: Optional parameter to filter the Temporary Commands listed based on a search value (it results in a `*[search]*` wildcard match).',
                'Example:',
                `\`${evokedCommand} list good\``,
                '\u200B',
            ]),
            inline: false,
        },
        {
            name: 'Command aliases',
            value: '`.temporarycommand`, `.tempcommand`, `.tc`',
            inline: false,
        },
    ],
});

const listEmbed = (fields: EmbedField[], count: number) => makeEmbed({
    title: 'Temporary Commands - List',
    description: `List of ${count} Temporary command(s) matching the search (maximum of 10).`,
    fields,
});

const missingInfoEmbed = (action: string, information: string) => makeEmbed({
    title: `Temporary Command - ${action} - missing information`,
    description: `${information}.`,
    color: Colors.Red,
});

const noConnEmbed = makeEmbed({
    title: 'Temporary Command - No Connection',
    description: 'Could not connect to the database.',
    color: Colors.Red,
});

const notFoundEmbed = (action: string, command: string) => makeEmbed({
    title: `Temporary Command - ${action} - ${command} not found`,
    description: 'No Temporary Command(s) matching the search can be found.',
    color: Colors.Red,
});

const failedEmbed = (action: string, command: string) => makeEmbed({
    title: `Temporary Command - ${action} failed`,
    description: `Failed to ${action} the temporary command "${command}", change not saved to mongoDB.`,
    color: Colors.Red,
});

const temporaryCommandListEmbedField = (command: string, severity: string, title: string): EmbedField[] => [
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
];

export const temporarycommand: CommandDefinition = {
    name: ['temporarycommand', 'tempcommand', 'tc'],
    description: 'Runs a temporary command.',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const conn = await getConn();
        if (!conn) {
            await msg.reply({ embeds: [noConnEmbed] });
            return;
        }

        const evokedCommand = msg.content.split(/\s+/)[0];
        const args = msg.content.split(/\s+/).slice(1);
        if ((args.length < 1 && parseInt(args[1]) !== 0) || args[0] === 'help') {
            await msg.reply({ embeds: [helpEmbed(evokedCommand)] });
            return;
        }

        let subCommand = args[0].toLowerCase();
        let subArgs = args.slice(1).join(' ');
        if (subCommand !== 'list' && subCommand !== 'show') {
            subCommand = 'show';
            [subArgs] = args;
        }

        const regexCheck = /^["]?\.?(?<command>[\w-]+)?["]?.*$/;
        const regexMatches = subArgs.match(regexCheck);
        if (subArgs.length > 0 && (!regexMatches || !regexMatches.groups || !regexMatches.groups.command)) {
            await msg.reply({ embeds: [missingInfoEmbed(subCommand, `You need to provide the expected format to ${subCommand} a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
            return;
        }

        if (subCommand === 'show') {
            if (!regexMatches || !regexMatches.groups || !regexMatches.groups.command) {
                await msg.reply({ embeds: [missingInfoEmbed(subCommand, `You need to provide the expected format to ${subCommand} a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
                return;
            }
            const { command } = regexMatches.groups;
            let temporaryCommands = [];
            try {
                temporaryCommands = await TemporaryCommand.find({ command });
                if (!temporaryCommands || temporaryCommands.length !== 1) {
                    await msg.reply({ embeds: [notFoundEmbed('Show', command)] });
                    return;
                }
            } catch {
                await msg.reply({ embeds: [notFoundEmbed('Show', command)] });
                return;
            }

            let color: number = FBWColors.FBW_CYAN;
            const [temporaryCommand] = temporaryCommands;
            const { title, content, severity, imageUrl } = temporaryCommand;
            switch (severity) {
            case 'warning':
                color = Colors.Yellow;
                break;
            case 'error':
                color = Colors.Red;
                break;
            default:
                break;
            }
            const runTemporaryCommand = makeEmbed({
                title,
                description: content,
                color,
                image: imageUrl ? { url: imageUrl } : null,
            });

            await replyWithEmbed(msg, runTemporaryCommand);

            temporaryCommand.lastUsed = new Date();
            try {
                temporaryCommand.save();
            } catch {
                await modLogsChannel.send({ embeds: [failedEmbed('Update last used', command)] });
            }

            return;
        }

        if (subCommand === 'list') {
            const searchRegex = regexMatches && regexMatches.groups && regexMatches.groups.command ? new RegExp(regexMatches.groups.command) : null;
            const temporaryCommands = searchRegex ? await TemporaryCommand.find({ command: searchRegex }) : await TemporaryCommand.find();

            const fields: EmbedField[] = temporaryCommands.sort((a, b) => a.command.localeCompare(b.command)).map((temporaryCommand) => {
                const { command, title, severity } = temporaryCommand;
                return temporaryCommandListEmbedField(command, severity, title);
            }).slice(0, 10).flat();

            if (temporaryCommands.length > 0) {
                await msg.reply({ embeds: [listEmbed(fields, temporaryCommands.length)] });
                return;
            }
            if (searchRegex) {
                await msg.reply({ embeds: [notFoundEmbed('List', regexMatches.groups.command)] });
                return;
            }
            await msg.reply({ embeds: [notFoundEmbed('List', '')] });
        }
    },
};
