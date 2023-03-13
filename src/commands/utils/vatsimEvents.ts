import fetch from 'node-fetch';
import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory } from '../../constants';
import Logger from '../../lib/logger';
import { makeEmbed } from '../../lib/embed';

const BASE_VATSIM_URL = 'https://my.vatsim.net';

const handleLocaleTimeString = (date: Date) => date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
});

const handleLocaleDateString = (date: Date) => date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
});

export const vatsimEvents: CommandDefinition = {
    name: ['events', 'event', 'ev', 'vatsimevents', 'vatevents', 'vatev'],
    description: 'Get the upcoming events from the VATSIM network.',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        try {
            const eventsList = await fetch(`${BASE_VATSIM_URL}/api/v1/events/all`)
                .then((res) => res.json())
                .then((res) => res.data)
                .then((res) => res.filter((event) => event.type === 'Event'))
                .then((res) => res.slice(0, 6));

            const fields: EmbedField[] = eventsList.map((event) => {
                // eslint-disable-next-line camelcase
                const { name, organisers, end_time, start_time, link } = event;
                const { division } = organisers[0];
                const startDate = new Date(start_time);
                const endDate = new Date(end_time);
                const startTime = handleLocaleTimeString(startDate);
                const endTime = handleLocaleTimeString(endDate);
                const startDateString = handleLocaleDateString(startDate);
                const endDateString = handleLocaleDateString(endDate);

                return [
                    {
                        name: 'Name',
                        value: name,
                        inline: false,
                    },
                    {
                        name: 'Start Time/Date',
                        value: `${startTime}/${startDateString}`,
                        inline: true,
                    },
                    {
                        name: 'End Time/Date',
                        value: `${endTime}/${endDateString}`,
                        inline: true,
                    },
                    {
                        name: 'Division',
                        value: `${division}`,
                        inline: true,
                    },
                    {
                        name: 'Link',
                        value: `${link}`,
                        inline: false,
                    },
                ];
            }).flat();

            const eventsEmbed = makeEmbed({
                title: 'VATSIM Events',
                description: 'A list of upcoming events on the VATSIM network. Find the full list [here.](https://my.vatsim.net/events)',
                fields,
            });

            return replyWithEmbed(msg, eventsEmbed);
        } catch (err) {
            Logger.error(err);
            const errorEmbed = makeEmbed({
                title: 'Events Error',
                description: err.message,
                color: Colors.Red,
            });
            return msg.reply({ embeds: [errorEmbed] });
        }
    },
};
