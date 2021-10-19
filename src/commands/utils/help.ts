import { DMChannel, EmbedFieldData, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import commands from '../index';
import { CommandCategory } from '../../constants';
import Logger from '../../lib/logger';

export const help: CommandDefinition = {
    name: 'help',
    description: 'Sends a list of available commands to the user',
    category: CommandCategory.PUBLIC,
    executor: (msg) => msg.author.createDM()
        .then(async (dmChannel) => {
            await msg.delete();

            const response = await msg.reply('I\'ve DM\'d you with the list of the commands you can use!');
            setTimeout(() => {
                response.delete();
            }, 4_000);

            // Catch all errors to prevent leaking DM activity to public error embeds
            try {
                await handleDmCommunication(dmChannel, msg.author);
            } catch (e) {
                Logger.error(e);
            }
        }),
};

async function handleDmCommunication(dmChannel: DMChannel, author: User, index: number = 0) {
    const fieldsPerEmbed = 1;
    const allFields = renderAllCategories();

    const embedsToUse = allFields.slice(index, index + fieldsPerEmbed);
    const dmEmbed = makeEmbed({
        title: 'FlyByWire Simulations | Commands List',
        fields: embedsToUse,
    });

    // Send reaction embeds for interaction
    const sentEmbedMessage = await dmChannel.send(dmEmbed);

    // Only act on certain reactions. I am using`includes` here so new reactions can be easily added.
    const reactionFilter = (reaction, user) => ['⏪', '⏩', '❌'].includes(reaction.emoji.name) && user.id === author.id;
    sentEmbedMessage.awaitReactions(reactionFilter, {
        max: 1,
        time: 60000,
        errors: ['time'],
    })
        .then(async (collected) => {
            const reaction = collected.first();

            switch (reaction.emoji.name) {
            case '⏩':
                // Send next embed and delete previous embed
                await sentEmbedMessage.delete();
                await handleDmCommunication(dmChannel, author, index + fieldsPerEmbed);
                break;
            case '⏪':
                // Send next embed and delete previous embed
                await sentEmbedMessage.delete();
                await handleDmCommunication(dmChannel, author, index - fieldsPerEmbed);
                break;
            case '❌':
                // Abort and delete message
                await sentEmbedMessage.delete();
                break;
            default:
                // Unknown reaction -> ignore
                break;
            }
        })
        .catch(async () => {
            await sentEmbedMessage.delete();
        });

    // Send reactions after listener has been set up
    if (index !== 0) {
        await sentEmbedMessage.react('⏪');
    }
    if (index + fieldsPerEmbed < allFields.length) {
        await sentEmbedMessage.react('⏩');
    }
    await sentEmbedMessage.react('❌');
}

function renderAllCategories(): EmbedFieldData[] {
    let commandArray = Object.values(commands);

    // Remove duplicates by name
    commandArray = commandArray.filter((v, i, a) => a.findIndex((t) => t.name === v.name) === i);

    // Group all commands by their category
    const groupedCommands = Object.values(CommandCategory)
        .map((category) => {
            const categoryCommands = commandArray.filter((command) => command.category === category);

            return {
                name: category,
                commands: categoryCommands,
            };
        });

    const fields: EmbedFieldData[] = [];

    for (const category of groupedCommands) {
        const fieldsValues = chunkStringArray(category.commands.map(renderCommand), 1024, '\n');

        fieldsValues.forEach((value) => {
            fields.push({
                name: category.name,
                value: value.join('\n'),
            });
        });
    }

    return fields;
}

function chunkStringArray(array: string[], maxJoinedLength: number, separator?: string): string[][] {
    const result = [];

    let currentChunk: string[] = [];
    for (let index = 0; index < array.length; index++) {
        if (currentChunk.join(separator).length + array[index].length >= maxJoinedLength) {
            result.push(currentChunk);
            currentChunk = [];
        }

        currentChunk.push(array[index]);
    }

    result.push(currentChunk);
    return result;
}

function renderCommand({ name, description }: CommandDefinition): string {
    const prefix = `**.${(Array.isArray(name) && name.length > 1) ? `${name[0]} (alias: ${name.slice(1).join(', ')})` : name}**`;

    if (description) {
        return `${prefix} - ${description}`;
    }

    return prefix;
}
