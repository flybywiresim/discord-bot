import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';
import request from 'request';
import dotenv from 'dotenv';
import { URLSearchParams } from 'url';

const WOFLRAMALPHA_API_URL = 'http://api.wolframalpha.com/v2/query'
const WOLFRAMALPHA_QUERY_URL = 'http://www.wolframalpha.com/input/?i={}'

export const wolframalpha: CommandDefinition = {
    name: 'wa',
    description: 'Queries the Wolfram Alpha API',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const query: string = msg.content.slice(4);
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
            url: WOFLRAMALPHA_API_URL + '?' + searchParams.toString(),
        }, async (error, response, body) => {
            if (response.statusCode === 200) {
                const answer = JSON.parse(body);
                console.log(answer.queryresult);
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
                        await msg.channel.send(result);
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
        })
    }
}
