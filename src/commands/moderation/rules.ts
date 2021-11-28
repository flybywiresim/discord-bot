import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const RULES_EMBED = [
    makeEmbed({
        title: 'FlyByWire Simulations Server Rules',
        description: 'Below are the rules you must follow to participate in this discord server. Failure to abide by these rules could result in a removal from the server.',
    }),
];

const FAQ_EMBED = [
    makeEmbed({
        title: '<:question:759405702044975114> Frequently Asked Questions',
        description: 'Check the <#751774575464939580> for the answers to your questions prior to asking in the channels below, post your question in the appropriate channel.',
    }),
];

const POLICIES_EMBED = [
    makeEmbed({
        title: '<:bookmark_tabs:759405704644788256> Discord Policies',
        description: 'Whilst using Discord, you are subject to both the Terms of Service, and its Community Guidelines:',
        fields: [
            {
                name: `ToS -`,
                value: "https://discordapp.com/terms \n",
            },
            {
                name: `Guidelines -`,
                value: "https://discordapp.com/guidelines \n",
            },
        ],
    }),
];

const DISCUSSION_EMBED = [
    makeEmbed({
        title: '<:speech_balloon:759405706804723742> Appropriate Discussion',
        description: makeLines([
            'We promote discussion in the server, however we expect everyone to follow Discord policies and good housekeeping.',
            '',
            '- If you have a message, please post it in the appropriate channel',
            '- Send your message once; do not repeat messages',
            '- Do not send malicious or illegal content',
        ]),
    }),
];

const ROLE_EMBED = [
    makeEmbed({
        title: '<:person_raising_hand:759405708994281493> Role Assignment',
        description: 'We encourage people to use their vast experience and knowledge to help us create a highly detailed addon. If you have skills in Documentation, Modelling and/or Programming, please assign your <#751780817772216401> and get started with the conversation to help us develop the addon, verification of these roles will be required to access the organiser.',
    }),
];

export const rules: CommandDefinition = {
    name: 'rules',
    description: 'Sends the rules',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send(RULES_EMBED);
        await msg.channel.send(FAQ_EMBED);
        await msg.channel.send(POLICIES_EMBED);
        await msg.channel.send(DISCUSSION_EMBED);
        await msg.channel.send(ROLE_EMBED);
    },
};
