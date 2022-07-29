import fetch from 'node-fetch';
import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

export const holidays: CommandDefinition = {
    name: 'holidays',
    category: CommandCategory.UTILS,
    description: 'Shows upcoming public holidays worldwide',
    executor: async (msg) => {
        const holidays = await fetch('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide').then((res) => res.json());
        const holidaysEmbed = makeEmbed({
            title: 'Upcoming Worldwide Holidays',
            description: 'List of worldwide holidays:',
            fields: holidays.slice(0, 5).map((holiday) => [
                {
                    name: 'Holiday Name',
                    value: holiday.name,
                },
                {
                    name: 'Date',
                    value: holiday.date,
                    inline: true,
                },
                {
                    name: 'Local Name',
                    value: holiday.localName,
                    inline: true,
                },
                {
                    name: 'Country Code',
                    value: holiday.countryCode,
                    inline: true,
                },
            ]),
        });
        return msg.channel.send({ embeds: [holidaysEmbed] });
    },
};
