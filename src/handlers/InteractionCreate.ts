import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, Colors, ContextMenuCommandBuilder, Events, Interaction, ModalActionRowComponentBuilder, ModalBuilder, REST, Routes, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandNumberOption, SlashCommandStringOption, SlashCommandSubcommandBuilder, SlashCommandSubcommandsOnlyBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
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
                if (command.subcommands === undefined || command.subcommands.length === 0) {
                    for (const commandOption of command.options[0]) {
                        addSlashCommandOption(commandOption, slashCommandBuilder);
                    }
                } else {
                    for (let i = 0; i < command.subcommands.length; i++) {
                        const subCommandBuilder = command.subcommands[i];
                        for (const commandOption of command.options[i]) {
                            addSlashCommandOption(commandOption, subCommandBuilder);
                        }
                        slashCommandBuilder.addSubcommand(subCommandBuilder);
                    }
                }
                slashCommands.push(slashCommandBuilder.toJSON());
            }
            if (command.isMessageCommand) {
                const applicationBuilder = new ContextMenuCommandBuilder();
                applicationBuilder.setName(Array.isArray(command.name) ? command.name[0] : command.name);
                if (command.isMessageCommand) {
                    applicationBuilder.setType(ApplicationCommandType.Message);
                }
                slashCommands.push(applicationBuilder.toJSON());
            }
            if (command.isUserCommand) {
                const applicationBuilder = new ContextMenuCommandBuilder();
                applicationBuilder.setName(Array.isArray(command.name) ? command.name[0] : command.name);
                if (command.isUserCommand) {
                    applicationBuilder.setType(ApplicationCommandType.User);
                }
                slashCommands.push(applicationBuilder.toJSON());
            }
        }
        const rest = new REST().setToken(process.env.BOT_SECRET);
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slashCommands });
    },
    executor: async (interaction: Interaction) => {
        Logger.debug(`Processing interaction ${interaction.toString()} from user ${interaction.user.username} in channel ${interaction.channel.name} of server ${interaction.guildId}.`);

        if (interaction.user.bot === true) {
            Logger.debug('Bailing because message author is a bot.');
            return;
        }

        if (interaction.isCommand()) {
            const command = commands[interaction.commandName];

            if (interaction.isContextMenuCommand && command.options) {
                const modal = new ModalBuilder();
                modal.setCustomId(interaction.commandName).setTitle('CommandOptions');
                const textinput = command.options.at(0).map((option) => new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(new TextInputBuilder().setCustomId(option.name).setLabel(option.name).setStyle(TextInputStyle.Short)));
                modal.addComponents(textinput);
                await interaction.showModal(modal);
                return;
            }

            let executor;
            if (isExecutorCommand(command)) {
                ({ executor } = (command as CommandDefinition));
            } else {
                return;
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
                interaction.followUp({ embeds: [errorEmbed] });
            }
        } else if (interaction.isModalSubmit()) {
            const command = commands[interaction.customId.split(/\s+/).at(0)];

            let executor;
            if (isExecutorCommand(command)) {
                ({ executor } = (command as CommandDefinition));
            } else {
                return;
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
                interaction.followUp({ embeds: [errorEmbed] });
            }
        }
        Logger.debug('Command executor done.');
    },
};

function addSlashCommandOption(commandOption, slashCommandBuilder: SlashCommandBuilder | SlashCommandSubcommandBuilder) {
    switch (commandOption.type) {
    case ApplicationCommandOptionType.String:
        slashCommandBuilder.addStringOption(commandOption as SlashCommandStringOption);
        break;
    case ApplicationCommandOptionType.Boolean:
        slashCommandBuilder.addBooleanOption(commandOption as SlashCommandBooleanOption);
        break;
    case ApplicationCommandOptionType.Integer:
        slashCommandBuilder.addIntegerOption(commandOption as SlashCommandIntegerOption);
        break;
    case ApplicationCommandOptionType.Number:
        slashCommandBuilder.addNumberOption(commandOption as SlashCommandNumberOption);
        break;
    default:
        break;
    }
}
