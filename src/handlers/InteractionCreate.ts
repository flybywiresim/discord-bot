import { ApplicationCommandOptionType, Colors, Events, Interaction, REST, Routes, SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import Logger from '../lib/logger';
import commands from '../commands';
import { CommandDefinition, isExecutorCommand } from '../lib/command';
import { DEBUG_MODE, client } from '..';
import { makeEmbed } from '../lib/embed';

module.exports = {
    event: Events.InteractionCreate,
    registrator: async () => {
        const slashCommands = [];
        for (const [, command] of Object.entries(commands)) {
            if (command.isSlashCommand) {
                const slashCommandBuilder = new SlashCommandBuilder()
                    .setName(Array.isArray(command.name) ? command.name[0] : command.name)
                    .setDescription(command.description);
                for (const commandOption of command.options) {
                    if (commandOption.type === ApplicationCommandOptionType.String) {
                        slashCommandBuilder.addStringOption(commandOption as SlashCommandStringOption);
                    }
                }
                slashCommands.push(slashCommandBuilder.toJSON());
            }
        }
        const rest = new REST().setToken(process.env.BOT_SECRET);
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slashCommands });
    },
    executor: async (interaction: Interaction) => {
        Logger.debug(`Processing interaction ${interaction.toString()} from user ${interaction.user.username} in channel ${interaction.channel.name} of server ${interaction.guildId}.`);

        if (interaction.isCommand()) {
            if (interaction.user.bot === true) {
                Logger.debug('Bailing because message author is a bot.');
            }

            const command = commands[interaction.commandName];
            let executor;
            if (isExecutorCommand(command)) {
                ({ executor } = (command as CommandDefinition));
            }
            try {
                await executor(interaction, client);
            } catch ({ name, message, stack }) {
                Logger.error({ name, message, stack });
                const errorEmbed = makeEmbed({
                    color: Colors.Red,
                    title: 'Error while Executing Command',
                    description: DEBUG_MODE ? `\`\`\`D\n${stack}\`\`\`` : `\`\`\`\n${name}: ${message}\n\`\`\``,
                });
                interaction.reply({ embeds: [errorEmbed] });
            }
        }
        Logger.debug('Command executor done.');
    },
};
