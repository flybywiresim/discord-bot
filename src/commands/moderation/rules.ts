import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { Channels, CommandCategory, Roles } from '../../constants';

const RULES_EMBED = makeEmbed({
    title: 'FlyByWire Simulations Server Rules',
    description: makeLines([
        'Below are the rules you must follow to participate in this discord server. Failure to abide by these rules could result in a removal from the server. Mute/ban evasions will result in a permanent ban.',
        '',
        `The <@&${Roles.MODERATION_TEAM}> reserve the right to action at discretion.`,
    ]),
});

const FAQ_EMBED = makeEmbed({
    title: '<:question:759405702044975114> Frequently Asked Questions',
    description: `Check the <#${Channels.FAQ}> for the answers to your questions prior to asking in the channels below, post your question in the appropriate channel.`,
});

const POLICIES_EMBED = makeEmbed({
    title: '<:bookmark_tabs:759405704644788256> Discord Policies',
    description: 'Whilst using Discord, you are subject to both the Terms of Service, and its Community Guidelines:',
    fields: [
        {
            name: 'ToS -',
            value: 'https://discordapp.com/terms',
        },
        {
            name: 'Guidelines -',
            value: 'https://discordapp.com/guidelines',
        },
    ],
});

const DISCUSSION_EMBED = makeEmbed({
    title: '<:speech_balloon:759405706804723742> Appropriate Discussion',
    description: makeLines([
        'We promote discussion in the server, however we expect everyone to follow Discord policies and good housekeeping.',
        '',
        '- If you have a message, please post it in the appropriate channel',
        '- Send your message once; do not repeat messages',
        '- Do not send malicious or illegal content',
        '- No troll messaging',
        '- No general spam',
        '- Do not send multiple unsolicited DM\'s',
        '- Inappropriate/offensive profile information/picture will not be tolerated',
        '- To help with moderation and set a standard the server language is English',
    ]),
});

const ROLE_EMBED = makeEmbed({
    title: '<:person_raising_hand:759405708994281493> Role Assignment',
    description: `We encourage people to use their vast experience and knowledge to help us create a highly detailed addon. If you have skills in Documentation, Modelling and/or Programming, please assign your <#${Channels.ROLES}> and get started with the conversation to help us develop the addon.`,
});

export const rules: CommandDefinition = {
    name: 'rules',
    description: 'Sends the rules',
    requiredPermissions: ['BanMembers'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send({ embeds: [RULES_EMBED] });
        await msg.channel.send({ embeds: [FAQ_EMBED] });
        await msg.channel.send({ embeds: [POLICIES_EMBED] });
        await msg.channel.send({ embeds: [DISCUSSION_EMBED] });
        await msg.channel.send({ embeds: [ROLE_EMBED] });
    },
};
