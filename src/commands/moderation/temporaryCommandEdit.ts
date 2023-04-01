import { Colors, EmbedField, TextChannel } from 'discord.js';
import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, RoleGroups } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';
import { getConn } from '../../lib/db';
import TemporaryCommand from '../../lib/schemas/temporaryCommandSchema';

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Manage Temporary Commands - Help',
    description: 'A command to manage temporary commands that consist of a Title, Content and Color. This can be used to create temporary commands for different purposes.',
    fields: [
        {
            name: 'Adding a Temporary Command',
            value: makeLines([
                'To create a temporary command, use the following bot command: ',
                `\`${evokedCommand} add <command> <severity> <title> <content>\``,
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
            name: 'Set an image to Temporary Command',
            value: makeLines([
                'To set an image to a temporary command, use the following bot command: ',
                `\`${evokedCommand} image <command> <image url>\``,
                '`command`: The command to set an image for.',
                '`image url`: The URL to the image to set.',
                'Example:',
                `\`${evokedCommand} image good-news-everyone https://domain.tld/good-news.png\``,
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

const notFoundEmbed = (action: string, command: string) => makeEmbed({
    title: `Temporary Command - ${action} - ${command} not found`,
    description: 'No Temporary Command(s) matching the search can be found.',
    color: Colors.Red,
});

const timestampText = (updatedTimestamp: Date) => moment(updatedTimestamp).utcOffset(0).format('YYYY-MM-DD HH:mm:ss');

const temporaryCommandSupportEmbedField = (command: string, severity: string, title: string, content: string, imageUrl: string): EmbedField[] => [
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
        name: 'Image',
        value: imageUrl || 'Empty',
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

const temporaryCommandEmbedField = (date: string, moderator: string, command: string, severity: string, title: string, content: string, imageUrl: string, actionModerator: string, lastUsed: string): EmbedField[] => [
    {
        inline: false,
        name: 'Command',
        value: command,
    },
    {
        inline: true,
        name: 'Created by',
        value: moderator,
    },
    {
        inline: true,
        name: 'Action by',
        value: actionModerator,
    },
    {
        inline: true,
        name: 'Date',
        value: date,
    },
    {
        inline: true,
        name: 'Last used',
        value: lastUsed,
    },
    {
        inline: true,
        name: 'Severity',
        value: severity,
    },
    {
        inline: true,
        name: 'Image',
        value: imageUrl || 'Empty',
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
    requirements: { roles: RoleGroups.STAFF },
    executor: async (msg) => {
        const subCommands = ['add', 'image', 'delete', 'info'];
        const conn = await getConn();
        if (!conn) {
            return msg.reply({ embeds: [noConnEmbed] });
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const supportOpsChannel = msg.guild.channels.resolve(Channels.SUPPORT_OPS) as TextChannel | null;
        const evokedCommand = msg.content.split(/\s+/)[0];
        const args = msg.content.replace(evokedCommand, '').trim();
        if (!args || args === 'help') {
            return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
        }

        let [subCommand] = args.split(/\s+/);
        let subArgs = args.replace(subCommand, '').trim();
        if (!subCommands.includes(subCommand)) {
            subCommand = 'info';
            subArgs = args;
        }

        if (subCommand === 'add') {
            const regexCheck = /^["]?\.?(?<command>[\w-]+)["]?\s["]?(?<severity>info|warning|error)["]?\s"(?<title>[^"]*|^[^"]*$)"\s"(?<content>[^"]*|^[^"]*$)"\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.command || !regexMatches.groups.severity) {
                return msg.reply({ embeds: [missingInfoEmbed('Add', `You need to provide the expected format to create a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
            }
            if (regexMatches.groups.title === '') {
                return msg.reply({ embeds: [missingInfoEmbed('Add', `You need to provide a non-empty title to create a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
            }
            if (regexMatches.groups.content === '') {
                return msg.reply({ embeds: [missingInfoEmbed('Add', `You need to provide a non-empty content to create a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
            }
            const { command, content, title, severity } = regexMatches.groups;
            const searchResult = await TemporaryCommand.find({ command });

            if (searchResult.length !== 0) {
                return msg.reply({ embeds: [alreadyExistsEmbed('Add', command)] });
            }

            const moderator = msg.author;
            const date = new Date();
            const lastUsed = new Date();
            const temporaryCommand = new TemporaryCommand({
                command,
                moderator,
                content,
                date,
                title,
                severity,
                lastUsed,
            });

            try {
                await temporaryCommand.save();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Add', command)] });
            }

            const { imageUrl } = temporaryCommand;
            try {
                await modLogsChannel.send({
                    embeds: [channelEmbed(
                        'Add',
                        command,
                        temporaryCommandEmbedField(
                            timestampText(date),
                            moderator.toString(),
                            command,
                            severity,
                            title,
                            content,
                            imageUrl,
                            moderator.toString(),
                            timestampText(lastUsed),
                        ),
                        Colors.Green,
                    )],
                });
            } catch {
                await msg.reply({ embeds: [noChannelEmbed('Add', 'Mod Log')] });
            }

            try {
                await supportOpsChannel.send({
                    embeds: [channelEmbed(
                        'Add',
                        command,
                        temporaryCommandSupportEmbedField(
                            command,
                            severity,
                            title,
                            content,
                            imageUrl,
                        ),
                        Colors.Green,
                    )],
                });
            } catch {
                await msg.reply({ embeds: [noChannelEmbed('Add', 'Support')] });
            }

            return msg.reply({ embeds: [successEmbed('Add', command)] });
        }

        if (subCommand === 'image') {
            const regexCheck = /^["]?\.?(?<command>[\w-]+)["]?\s["]?(?<imageUrl>https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))["]?\s*$/;
            const regexMatches = subArgs.match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.command || !regexMatches.groups.imageUrl) {
                return msg.reply({ embeds: [missingInfoEmbed('Configure image URL', `You need to provide the expected format to set the image for a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { command, imageUrl } = regexMatches.groups;
            const temporaryCommandSearchResult = await TemporaryCommand.find({ command });
            if (temporaryCommandSearchResult.length === 0) {
                return msg.reply({ embeds: [notFoundEmbed('Configure image URL', command)] });
            }
            const [temporaryCommand] = temporaryCommandSearchResult;

            temporaryCommand.imageUrl = imageUrl;
            try {
                temporaryCommand.save();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Configure image URL', command)] });
            }

            const { date, moderator, severity, title, content, lastUsed } = temporaryCommand;
            try {
                await modLogsChannel.send({
                    embeds: [channelEmbed(
                        'Configure image URL',
                        command,
                        temporaryCommandEmbedField(
                            timestampText(date),
                            moderator.toString(),
                            command,
                            severity,
                            title,
                            content,
                            imageUrl,
                            moderator.toString(),
                            timestampText(lastUsed),
                        ),
                        Colors.Green,
                    )],
                });
            } catch {
                await msg.reply({ embeds: [noChannelEmbed('Configure image URL', 'Mod Log')] });
            }

            try {
                await supportOpsChannel.send({
                    embeds: [channelEmbed(
                        'Configure image URL',
                        command,
                        temporaryCommandSupportEmbedField(
                            command,
                            severity,
                            title,
                            content,
                            imageUrl,
                        ),
                        Colors.Green,
                    )],
                });
            } catch {
                await msg.reply({ embeds: [noChannelEmbed('Configure image URL', 'Support')] });
            }

            return msg.reply({ embeds: [successEmbed('Configure image URL', command)] });
        }

        const regexCheck = /^["]?\.?(?<command>[\w-]+)?["]?.*$/;
        const regexMatches = subArgs.match(regexCheck);
        if (!regexMatches || !regexMatches.groups || !regexMatches.groups.command) {
            const subCommandText = subCommand === 'info' ? 'show the info of' : subCommand;
            return msg.reply({ embeds: [missingInfoEmbed(subCommand, `You need to provide the expected format to ${subCommandText} a temporary command. Check \`${evokedCommand} help\` for more details.`)] });
        }
        const { command } = regexMatches.groups;
        if (subCommand === 'info') {
            const searchResult = await TemporaryCommand.find({ command });

            if (searchResult.length === 0) {
                return msg.reply({ embeds: [notFoundEmbed('Info', command)] });
            }
            const { author } = msg;
            const { moderator, content, date, title, severity, imageUrl, lastUsed } = searchResult[0];
            return msg.reply({
                embeds: [infoEmbed(
                    temporaryCommandEmbedField(
                        timestampText(date),
                        moderator.toString(),
                        command,
                        severity,
                        title,
                        content,
                        imageUrl,
                        author.toString(),
                        timestampText(lastUsed),
                    ),
                    command,
                )],
            });
        }

        if (subCommand === 'delete') {
            let temporaryCommands = [];
            try {
                temporaryCommands = await TemporaryCommand.find({ command });
                if (!temporaryCommands || temporaryCommands.length !== 1) {
                    return msg.reply({ embeds: [notFoundEmbed('Delete', command)] });
                }
            } catch {
                return msg.reply({ embeds: [notFoundEmbed('Delete', command)] });
            }

            try {
                temporaryCommands[0].deleteOne();
            } catch {
                return msg.reply({ embeds: [failedEmbed('Delete', command)] });
            }

            const { author } = msg;
            const { moderator, content, date, title, severity, imageUrl, lastUsed } = temporaryCommands[0];
            try {
                await modLogsChannel.send({
                    embeds: [channelEmbed(
                        'Delete',
                        command,
                        temporaryCommandEmbedField(
                            timestampText(date),
                            moderator.toString(),
                            command,
                            severity,
                            title,
                            content,
                            imageUrl,
                            author.toString(),
                            timestampText(lastUsed),
                        ),
                        Colors.Red,
                    )],
                });
            } catch {
                await msg.reply({ embeds: [noChannelEmbed('Delete', 'Mod Log')] });
            }

            try {
                await supportOpsChannel.send({
                    embeds: [channelEmbed(
                        'Delete',
                        command,
                        temporaryCommandSupportEmbedField(
                            command,
                            severity,
                            title,
                            content,
                            imageUrl,
                        ),
                        Colors.Red,
                    )],
                });
            } catch {
                await msg.reply({ embeds: [noChannelEmbed('Delete', 'Support')] });
            }

            return msg.reply({ embeds: [successEmbed('Delete', command)] });
        }

        return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
    },
};
