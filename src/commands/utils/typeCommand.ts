import { EmbedData } from 'discord.js';
import { CommandDefinition, isMessageCommand, MessageCommandDefinition } from '../../lib/command';
import { AircraftTypeList, CommandCategory } from '../../constants';
import commands from '../index';
import Logger from '../../lib/logger';
import { makeEmbed, makeLines } from '../../lib/embed';

const REACTION_WAIT_TIME = 10000;
const enableMultipleAircraftTypes = true;
const defaultAircraftType = 'a32nx';
const supportedAircraftTypes = Object.keys(AircraftTypeList);

export const typeCommand: CommandDefinition = {
    name: supportedAircraftTypes,
    description: 'Shows the command details for the specified supported aircraft type',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const { author } = msg;
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
        if (!enableMultipleAircraftTypes || !typeEmbeds) {
            if (subCommand === evokedCommand) {
                const postEmbed = typeEmbeds && Object.keys(typeEmbeds).includes(defaultAircraftType) ? typeEmbeds[defaultAircraftType] : genericEmbed;
                await msg.channel.send({ embeds: [postEmbed] });
            }
            return;
        }
        const commandSupportedAircraftTypes = typeEmbeds ? Object.keys(typeEmbeds) : [];
        if (subCommand === evokedCommand) {
            const commandSupportedAircraftTypeEmojies = [];
            const { data: genericEmbedData } = genericEmbed;
            const postGenericEmbed = makeEmbed((genericEmbedData as EmbedData));
            const choiceEmbedFieldLines = [];
            choiceEmbedFieldLines.push('Please select the appropriate reaction for the Aircraft for which you would like more information:');
            commandSupportedAircraftTypes.forEach((element) => {
                commandSupportedAircraftTypeEmojies.push(AircraftTypeList[element]);
                choiceEmbedFieldLines.push(`${AircraftTypeList[element]} - ${element.toUpperCase()}`);
            });
            postGenericEmbed.addFields({
                name: 'Select the aircraft for more details:',
                value: makeLines(choiceEmbedFieldLines),
            });
            await msg.channel.send({ embeds: [postGenericEmbed] }).then(async (genericMessage) => {
                commandSupportedAircraftTypeEmojies.forEach(async (element) => {
                    genericMessage.react(element);
                });
                const filter = (reaction, user) => commandSupportedAircraftTypeEmojies.includes(reaction.emoji.name) && user.id === author.id;
                await genericMessage.awaitReactions({
                    filter,
                    max: 1,
                    time: REACTION_WAIT_TIME,
                    errors: ['time'],
                }).then(async (collected) => {
                    const reaction = collected.first();
                    let foundAircraftType;
                    for (const element of commandSupportedAircraftTypes) {
                        if (reaction.emoji.name === AircraftTypeList[element]) {
                            foundAircraftType = element;
                            break;
                        }
                    }
                    if (foundAircraftType) {
                        try {
                            await genericMessage.delete();
                        } catch (e) {
                            Logger.debug('Type Command - Generic message with choices was already deleted');
                        }
                        await msg.channel.send({ embeds: [typeEmbeds[foundAircraftType]] });
                    }
                }).catch(async () => {
                    try {
                        Logger.debug(`Type Command - Waited longer than ${REACTION_WAIT_TIME}ms, skipping`);
                        await genericMessage.delete();
                    } catch (e) {
                        Logger.debug('Type Command - Generic message with choices was already deleted');
                    }
                });
            });
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
