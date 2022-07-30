import fetch from 'node-fetch';
import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const holidays: CommandDefinition = {
    name: 'holidays',
    category: CommandCategory.UTILS,
    description: 'Shows upcoming public holidays worldwide',
    executor: async (msg) => {
        try {
            const holidays = await fetch('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide').then((res) => res.json());
            const fields: EmbedField[] = [];

            await holidays.slice(0, 5).map((holiday) => {
                fields.push({
                    name: 'Holiday Name',
                    value: holiday.name,
                    inline: false,
                });

                fields.push({
                    name: 'Date',
                    value: holiday.date,
                    inline: true,
                });

                fields.push({
                    name: 'Local Name',
                    value: holiday.localName,
                    inline: true,
                });

                fields.push({
                    name: 'Country Code',
                    value: holiday.countryCode,
                    inline: true,
                });
                return fields;
            });

            const holidaysEmbed = makeEmbed({
                title: 'Upcoming Worldwide Holidays',
                description: 'List of worldwide holidays:',
                fields,
            });

            return msg.channel.send({ embeds: [holidaysEmbed] });
        } catch (err) {
            const errorEmbed = makeEmbed({
                title: 'Error | Public Holidays',
                description: `An error occurred ${err}`,
                color: Colors.Red,
            });
            return msg.reply({ embeds: [errorEmbed] });
        }
    },
};
