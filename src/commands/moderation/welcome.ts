import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { Channels, CommandCategory, imageBaseUrl, RoleGroups } from '../../constants';

const HEADER_IMAGE_URL = `${imageBaseUrl}/moderation/welcome_discord_banner.png`;
const SOCIAL_IMAGE_URL = `${imageBaseUrl}/moderation/welcome_social_media.png`;
const SUPPORT_IMAGE_URL = `${imageBaseUrl}/moderation/welcome_support.png`;
const HELP_IMAGE_URL = `${imageBaseUrl}/moderation/welcome_help_and_support.png`;
const IMPORTANT_INFO_IMAGE_URL = `${imageBaseUrl}/moderation/welcome_impt_info.png`;

const SOCIAL_EMBED = makeEmbed({
    title: '<:Partnered:921520970123059231> FlyByWireSimulations | Socials',
    description: makeLines([
        '<:FBW:921521552699310141> <https://www.flybywiresim.com>',
        '<:Twitter:921521552942571601> <https://twitter.com/FlyByWireSim>',
        '<:Facebook:921521552984539146> <https://www.facebook.com/FlyByWireSimulations>',
        '<:Youtube:921521552829329488> <https://www.youtube.com/@FlyByWireSim>',
        '<:Twitch:921521552623804506> <https://www.twitch.tv/flybywiresimulations>',
    ]),
});

const SUPPORT_EMBED = makeEmbed({
    title: '<:Partnered:921520970123059231> FlyByWireSimulations | Support Us',
    description: makeLines([
        'You are able to voluntarily support us financially to ensure we are able to cover the costs of servers and developmental resources.',
        '',
        'https://opencollective.com/flybywire',
    ]),
});

const IMPORTANT_INFO_EMBED = makeEmbed({
    title: '<:Partnered:921520970123059231> FlyByWireSimulations | Important Info',
    description: 'By being a member of our Discord Server, you agree to the following, and failure to do so can result in removal from the server.',
    fields: [
        {
            name: 'Appropriate Content',
            value: makeLines([
                'We want to promote a healthy environment in our Discord server. To maintain this, we will not tolerate inappropriate names, profile pictures, messages or emotes that may offend others in the community. Alongside this we do not welcome any form of spam, the distribution or conversation of pirated material, or general disturbances in our channels and voice chat.',
                '',
                'Moderators and Admins reserve the right to mute or remove any member they see violating the rules without prior notice.',
                '',
                'Avoiding mutes or bans will result in further action being taken to safeguard the Discord community.',
            ]),
        },
        {
            name: 'Discord Policies',
            value: makeLines([
                'Please read the Discord TOS and Guidelines listed below!',
                '',
                'Discord Terms of Service & Guidelines',
                '',
                'https://discordapp.com/terms',
                '',
                'https://discordapp.com/guidelines',
            ]),
        },
    ],
});

const HELP_EMBED = makeEmbed({
    title: '<:Partnered:921520970123059231> FlyByWireSimulations | Help and Support',
    fields: [
        {
            name: 'Documentation',
            value: 'Guides & Support Information: https://docs.flybywiresim.com/',
        },
        {
            name: 'FAQ',
            value: `Always check <#${Channels.FAQ}>, <#${Channels.KNOWN_ISSUES}>, and our documentation site to see if your question has already been answered. If not head over to <#${Channels.A32NX_SUPPORT}> for assistance.`,
        },
        {
            name: 'Flight School',
            value: `We've opened our <#${Channels.FLIGHT_SCHOOL}> channel for any questions you have pertaining to the the operation of the A32NX or general questions about flying an aircraft in the simulator.`,
        },

    ],
});

export const welcome: CommandDefinition = {
    name: 'welcome',
    description: 'Sends the welcome',
    requirements: { roles: RoleGroups.STAFF },
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send({ files: [HEADER_IMAGE_URL] });

        await msg.channel.send(makeLines([
            'Welcome to the **Official Discord Server** of **FlyByWire Simulations!**',
            '',
            'The A32NX Project is a community-driven open source project to create a free Airbus A320neo in Microsoft Flight Simulator that is as close to reality as possible. It started out as an enhancement project to the default A320neo and is now proceeding as an independent add-on project aiming to bring the FlyByWire A32NX up to payware-level systems depth and functionality, all for free.',
            '',
            'We are also developing an A380 from scratch which will be aiming to produce a high fidelity freeware aircraft.',
            '',
            `Feel free to download, test, and share your feedback, or if you are interested in developing, assign your <#${Channels.ROLES}>, and get cracking!`,
        ]));

        await msg.channel.send({ files: [SOCIAL_IMAGE_URL] });

        await msg.channel.send({ embeds: [SOCIAL_EMBED] });

        await msg.channel.send({ files: [SUPPORT_IMAGE_URL] });

        await msg.channel.send({ embeds: [SUPPORT_EMBED] });

        await msg.channel.send({ files: [HELP_IMAGE_URL] });

        await msg.channel.send({ embeds: [HELP_EMBED] });

        await msg.channel.send({ files: [IMPORTANT_INFO_IMAGE_URL] });

        await msg.channel.send({ embeds: [IMPORTANT_INFO_EMBED] });
    },
};
