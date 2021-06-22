import { EmbedFieldData } from 'discord.js';
import { CommandDefinition } from '../lib/command';
import { makeEmbed } from '../lib/embed';
import { commands } from '../index';
import { CommandCategory } from '../constants';

export const help: CommandDefinition = {
    name: 'help',
    description: 'Sends a list of available commands to the user',
    category: CommandCategory.PUBLIC,
    executor: (msg) => {
        msg.author.createDM().then(async (channel) => {
            const response = await msg.reply('I\'ve PM\'d you with the list of the commands you can use!');

            const sortedCommands = sortCommandsByCategory(commands);

            const fields: EmbedFieldData[] = [];

            for (const categoryCommands of Object.entries(sortedCommands)) {
                fields.push({
                    name: `**${categoryCommands[0]}**`,
                    value: categoryCommands[1].map((command) => (
                        `**${command.name}** - ${command.description ?? '*no description*'}`
                    )).join('\n'),
                });
            }

            // No commands (should never happen, really)
            if (fields.length === 0) {
                fields.push({ inline: true, name: 'Error', value: 'No commands available.' });
            }

            const dmEmbed = makeEmbed({
                title: 'FlyByWire Simulations | Commands List',
                fields,
            });

            await channel.send(dmEmbed);
            await msg.delete();

            setTimeout(() => {
                response.delete();
            }, 4_000);
        });
    },
};

function sortCommandsByCategory(commands: CommandDefinition[]): { [k: string]: CommandDefinition[] } {
    const categories = {};

    for (const category of Object.values(CommandCategory)) {
        const categoryCommands = commands.filter((command) => command.category === category);

        if (categoryCommands.length > 0) {
            categories[category] = categoryCommands;
        }
    }

    return categories;
}
