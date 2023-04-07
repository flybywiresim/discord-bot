import { URLSearchParams } from 'url';
import fetch from 'node-fetch';
import { Colors } from 'discord.js';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { Channels, CommandCategory } from '../../constants';
import Logger from '../../lib/logger';

const WOLFRAMALPHA_API_URL = 'https://api.wolframalpha.com/v2/query?';
const WOLFRAMALPHA_QUERY_URL = 'https://www.wolframalpha.com/input/?';

export const wolframalpha: CommandDefinition = {
    name: ['wa', 'calc', 'ask'],
    description: 'Queries the Wolfram Alpha API',
    category: CommandCategory.UTILS,
    requirements: {
        channels: [Channels.BOT_COMMANDS],
        verboseErrors: true,
    },
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.wa\s+/, ' ').split(' ');

        if (splitUp.length <= 1) {
            const noQueryEmbed = makeEmbed({
                title: 'Wolfram Alpha Error | Missing Query',
                description: 'Please provide a query. For example: `.wa How much is 1 + 1?`',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [noQueryEmbed] });
            return;
        }
        const query = splitUp.slice(1).join(' ');

        const params = {
            appid: process.env.WOLFRAMALPHA_TOKEN,
            input: query,
            format: 'plaintext',
            output: 'JSON',
        };

        const searchParams = new URLSearchParams(params);

        try {
            const response = await fetch(`${WOLFRAMALPHA_API_URL}${searchParams.toString()}`)
                .then((res) => res.json());

            if (response.error) {
                const errorEmbed = makeEmbed({
                    title: 'Wolfram Alpha Error',
                    description: response.error,
                    color: Colors.Red,
                });
                await msg.reply({ embeds: [errorEmbed] });
                return;
            }

            if (response.queryresult.success === true) {
                const podTexts: string[] = [];
                response.queryresult.pods.forEach((pod) => {
                    if (pod.id !== 'Input' && pod.primary === true) {
                        const results: string[] = [];
                        pod.subpods.forEach((subpod) => {
                            results.push(subpod.plaintext);
                        });
                        if (results.length > 0) {
                            podTexts.push(`**${pod.title}:** \n${results.join('\n')}`);
                        }
                    }
                });
                if (podTexts.length > 0) {
                    const result = podTexts.join('\n\n');
                    const queryParams = new URLSearchParams({ i: query });

                    const waEmbed = makeEmbed({
                        description: makeLines([
                            result,
                            '',
                            `[Web Result](${WOLFRAMALPHA_QUERY_URL}${queryParams.toString()})`,
                        ]),
                    });

                    await replyWithEmbed(msg, waEmbed);
                    return;
                }
                const noResultsEmbed = makeEmbed({
                    title: 'Wolfram Alpha Error | No Results',
                    description: makeLines([
                        'No results were found for your query.',
                    ]),
                    color: Colors.Red,
                });
                await msg.reply({ embeds: [noResultsEmbed] });
                return;
            }
            const obscureQueryEmbed = makeEmbed({
                title: 'Wolfram Alpha Error | Could not understand query',
                description: makeLines([
                    'Wolfram Alpha could not understand your query.',
                ]),
                color: Colors.Red,
            });
            await msg.reply({ embeds: [obscureQueryEmbed] });
            return;
        } catch (e) {
            Logger.error('wolframalpha:', e);
            const fetchErrorEmbed = makeEmbed({
                title: 'Wolfram Alpha | Fetch Error',
                description: 'There was an error fetching your request. Please try again later.',
                color: Colors.Red,
            });
            await msg.reply({ embeds: [fetchErrorEmbed] });
        }
    },
};
