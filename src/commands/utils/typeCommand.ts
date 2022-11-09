import { CommandDefinition, isMessageCommand, MessageCommandDefinition } from '../../lib/command';
import { AircraftTypeList, CommandCategory } from '../../constants';
import commands from '../index';
import Logger from '../../lib/logger';

const supportedAircraftTypes = Object.keys(AircraftTypeList);

export const typeCommand: CommandDefinition = {
    name: supportedAircraftTypes,
    description: 'Shows the command details for the specified supported aircraft type',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const [dotEvokedCommand] = msg.content.trim().split(/\s+/);
        const evokedCommand = dotEvokedCommand.substring(1);
        let subCommand;
        if (!supportedAircraftTypes.includes(evokedCommand)) {
            // Executor evoked for generic Message Command, not specific type
            subCommand = evokedCommand;
        } else {
            const args = msg.content.replace(dotEvokedCommand, '').trim();
            if (!args) {
                Logger.debug(`Type Command - evoked: ${evokedCommand} - Error: No sub command`);
                // Evoked without an actual command
                return;
            }
            [subCommand] = args.split(/\s+/);
        }
        const command = commands[subCommand];
        if (!command) {
            Logger.debug(`Type Command - evoked: ${evokedCommand} - sub: ${subCommand} - Sub command doesn't exist`);
            // Evoked with a non-existing command
            return;
        }
        const { name } = command;
        const commandsArray = Array.isArray(name) ? name : [name];
        if (!commandsArray.includes(subCommand)) {
            Logger.debug(`Type Command - evoked: ${evokedCommand} - sub: ${subCommand} - Mismatch between sub command and command`);
            // Somehow it found a command that doesn't actually support this command string?
            return;
        }
        if (!isMessageCommand(command)) {
            Logger.debug(`Type Command - evoked: ${evokedCommand} - sub: ${subCommand} - Sub Command is not a Message Command`);
            // This isn't a simple MessageCommand
            return;
        }
        const { genericEmbed, typeEmbeds } = (command as MessageCommandDefinition);
        const commandSupportedAircraftTypes = Object.keys(typeEmbeds);
        if (subCommand === evokedCommand) {
            // Generic command is being requested
            await msg.channel.send({ embeds: [genericEmbed] });
            return;
        }
        if (commandSupportedAircraftTypes.includes(evokedCommand)) {
            const keyTyped = evokedCommand as keyof typeof typeEmbeds;
            await msg.channel.send({ embeds: [typeEmbeds[keyTyped]] });
            return;
        }
        Logger.debug(`Type Command - evoked: ${evokedCommand} - sub: ${subCommand} - No Embed for the specified type (evoked command)`);
    },
};
