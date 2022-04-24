import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';
import request from 'request';
import { URLSearchParams } from 'url';
import { Channels } from '../../constants';

const WOFLRAMALPHA_API_URL = 'http://api.wolframalpha.com/v2/query?'
const WOLFRAMALPHA_QUERY_URL = 'http://www.wolframalpha.com/input/?'

export const wolframalpha: CommandDefinition = {
    name: ['wa', 'calc', 'ask'],
    description: 'Queries the Wolfram Alpha API',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const allowedChannel = Channels.BOT_COMMANDS;
        if (msg.channelId === allowedChannel) {
            const re = /\.\S+\s(.+)/;
            const query: string = msg.content.match(re)[1];
            //const query: string = msg.content.slice(4);
            const params = {
                appid: process.env.WOLFRAMALPHA_TOKEN,
                input: query,
                format: 'plaintext',
                output: 'JSON',
            }
            let searchParams = new URLSearchParams(params);
            console.log('WA Query', query);
            request({
                method: 'GET',
                url: WOFLRAMALPHA_API_URL + searchParams.toString(),
            }, async (error, response, body) => {
                if (response.statusCode === 200) {
                    const answer = JSON.parse(body);
                    //console.log(answer.queryresult);
                    if (answer.queryresult.success === true) {
                        let podTexts: string[] = [];
                        answer.queryresult.pods.forEach(pod => {
                            if (pod.id !== "Input" && pod.primary === true) {
                                let results: string[] = [];
                                pod.subpods.forEach(subpod => {
                                    results.push(subpod.plaintext.replace(/\n/g, '; '));
                                });
                                if (results.length > 0) {
                                    podTexts.push('**' + pod.title + ':** ' + results.join(', '));
                                }
                            }
                        });
                        if (podTexts.length > 0) {
                            const result = podTexts.join(' - ');
                            const queryParams = new URLSearchParams({i: query});
                            //await msg.channel.send(result + ' - [Web Result](' + WOLFRAMALPHA_QUERY_URL + queryParams.toString() + ')');

                            const waEmbed = makeEmbed({
                                description: result + ' - [Web Result](' + WOLFRAMALPHA_QUERY_URL + queryParams.toString() + ')'
                            })

                            msg.channel.send({embeds: [waEmbed]});
                        }
                        else {
                            msg.channel.send('Wolfram Alpha did not give an answer.')
                        }
                    } else {
                        await msg.channel.send('Wolfram Alpha could not understand your query.')
                    }
                } else {
                    console.log('Wolfram Alpha Error!', error);
                }
            });
        }
    }
}
