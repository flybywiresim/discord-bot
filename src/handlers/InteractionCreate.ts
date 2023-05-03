import { Events, Interaction, REST, Routes, SlashCommandBuilder } from 'discord.js';
import Logger from '../lib/logger';
import commands from '../commands';

module.exports = {
    event: Events.InteractionCreate,
    registrator: async () => {
        const slashCommands = [];
        for (const [, command] of Object.entries(commands)) {
            if (command.isSlashCommand) {
                const slashCommandBuilder = new SlashCommandBuilder()
                    .setName(Array.isArray(command.name) ? command.name[0] : command.name)
                    .setDescription(command.description);
                slashCommands.push(slashCommandBuilder.toJSON());
            }
        }
        const rest = new REST().setToken(process.env.BOT_SECRET);
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slashCommands });
    },
    executor: async (interaction: Interaction) => {
        Logger.debug(`Processing interaction ${interaction.toString()} from user ${interaction.user.username} in channel ${interaction.channel.name} of server ${interaction.guildId}.`);

        if (interaction.user.bot === true) {
            Logger.debug('Bailing because message author is a bot.');
        }
    },
};
