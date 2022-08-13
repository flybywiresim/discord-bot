import { Colors } from 'discord.js';
import { CommandDefinition } from '../../../lib/command';
import { CommandCategory } from '../../../constants';
import { makeEmbed, makeLines } from '../../../lib/embed';
import { getConn } from '../../../lib/db';
import SimpleCommand from '../../../lib/schemas/simpleCommandSchema';

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Run Simple Command - Help',
    description: 'A command to run simple commands.',
    fields: [
        {
            name: 'Run a Simple Command',
            value: makeLines([
                'To run a simple command, run the following bot command: ',
                `\`${evokedCommand} <command>\`.`,
                '`command`: The command to run, needs to be an exact match.',
                'Example:',
                `\`${evokedCommand} exp-bad-release\``,
            ]),
            inline: false,
        },
    ],
});

const noConnEmbed = makeEmbed({
    title: 'Run Simple Command - No Connection',
    description: 'Could not connect to the database.',
    color: Colors.Red,
});

const notFoundEmbed = (command: string) => makeEmbed({
    title: `Run Simple Command - ${command} not be found`,
    description: `The simple command "${command}" does not exist.`,
    color: Colors.Red,
});

export const runsimplecommand: CommandDefinition = {
    name: ['runsimplecommand', 'sc', 'rsc'],
    description: 'Runs a simple command.',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const conn = await getConn();
        if (!conn) {
            await msg.channel.send({ embeds: [noConnEmbed] });
            return;
        }

        const evokedCommand = msg.content.split(/\s+/)[0];
        const args = msg.content.split(/\s+/).slice(1);
        if ((args.length < 1 && parseInt(args[1]) !== 0) || args[0] === 'help') {
            await msg.channel.send({ embeds: [helpEmbed(evokedCommand)] });
            return;
        }

        const regexCheck = /^["]?\.?(?<command>[\w-]+)?["]?\s*$/;
        const regexMatches = args[0].match(regexCheck);
        const { command } = regexMatches.groups;
        let simpleCommands = [];
        try {
            simpleCommands = await SimpleCommand.find({ command });
            if (!simpleCommands || simpleCommands.length !== 1) {
                await msg.channel.send({ embeds: [notFoundEmbed(command)] });
                return;
            }
        } catch {
            await msg.channel.send({ embeds: [notFoundEmbed(command)] });
            return;
        }

        let color = null;
        switch (simpleCommands[0].severity) {
        case 'warning':
            color = Colors.Yellow;
            break;
        case 'error':
            color = Colors.Red;
            break;
        default:
            break;
        }
        const runSimpleCommand = makeEmbed({
            title: simpleCommands[0].title,
            description: simpleCommands[0].content,
            color,
        });

        await msg.channel.send({ embeds: [runSimpleCommand] });
    },
};
