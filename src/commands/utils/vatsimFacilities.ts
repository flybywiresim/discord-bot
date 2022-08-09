import fetch from 'node-fetch';
import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import Logger from '../../lib/logger';
import { makeEmbed } from '../../lib/embed';

const DATA_VATSIM_URL = 'https://data.vatsim.net/v3/vatsim-data.json';

const handleLocaleDateTimeString = (date: Date) => date.toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
});

export const vatsimFacilities: CommandDefinition = {
    name: ['vatsim', 'vf', 'vatsimfacilities'],
    description: 'Find if one or more VATSIM facilities are online at the moment.',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.(vatsim|vf|vatfacilities)\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            const noQueryEmbed = makeEmbed({
                title: 'VATSIM Error | Missing Query',
                description: 'You must provide a VATSIM facility or location.',
                color: Colors.Red,
            });
            await msg.channel.send({ embeds: [noQueryEmbed] });
            return Promise.resolve();
        }
        const facilityName = splitUp[1].toUpperCase();
        try {
            const vatsimData = await fetch(DATA_VATSIM_URL)
                .then((res) => res.json());

            const vatsimRatings = vatsimData.ratings ? vatsimData.ratings : null;
            const vatsimFacilities = vatsimData.controllers ? vatsimData.controllers.filter((facility) => facility.callsign.includes(facilityName)) : null;
            const vatsimAtis = vatsimData.atis ? vatsimData.atis.filter((facility) => facility.callsign.includes(facilityName)) : null;

            let facilityEmbed;
            if (Object.keys(vatsimFacilities).length === 0 && Object.keys(vatsimAtis).length === 0) {
                facilityEmbed = makeEmbed({
                    title: `VATSIM Facilities | ${facilityName} - Offline or Not found`,
                    description: 'No online information available for this facility or group of facilities.',
                });
            } else {
                const fields: EmbedField[] = [...vatsimFacilities, ...vatsimAtis].map((facility) => {
                    // eslint-disable-next-line camelcase
                    const { callsign, frequency, logon_time, atis_code, text_atis, rating } = facility;
                    const logonTime = new Date(logon_time);
                    const logonTimeString = handleLocaleDateTimeString(logonTime);
                    const ratingDetail = vatsimRatings.filter((ratingInfo) => ratingInfo.id === rating);
                    const ratingText = `${ratingDetail[0].short} - ${ratingDetail[0].long}`;
                    const data = [
                        {
                            name: 'Callsign',
                            value: `${callsign}`,
                            inline: false,
                        },
                        {
                            name: 'Frequency',
                            value: `${frequency}`,
                            inline: true,
                        },
                        {
                            name: 'Logon Date & Time',
                            value: `${logonTimeString}`,
                            inline: true,
                        },
                        {
                            name: 'Rating',
                            value: `${ratingText}`,
                            inline: true,
                        },
                    ];

                    // eslint-disable-next-line camelcase
                    if (text_atis !== null) {
                        // eslint-disable-next-line camelcase
                        const atisTitle = atis_code ? `ATIS - Code: ${atis_code}` : 'ATIS';
                        data.push({
                            name: `${atisTitle}`,
                            // eslint-disable-next-line camelcase
                            value: `${text_atis}`,
                            inline: false,
                        });
                    }

                    return data;
                }).slice(0, 6).flat();

                const totalCount = Object.keys(vatsimFacilities).length + Object.keys(vatsimAtis).length;
                facilityEmbed = makeEmbed({
                    title: `VATSIM Facility | ${facilityName} - ${totalCount} Online`,
                    description: `A list of the first 5 Online VATSIM facilities matching ${facilityName}`,
                    fields,
                });
            }

            return msg.channel.send({ embeds: [facilityEmbed] });
        } catch (err) {
            Logger.error(err);
            const errorEmbed = makeEmbed({
                title: 'VATSIM Facilities Error',
                description: err.message,
                color: Colors.Red,
            });
            return msg.channel.send({ embeds: [errorEmbed] });
        }
    },
};
