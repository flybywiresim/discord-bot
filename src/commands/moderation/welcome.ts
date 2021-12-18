import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const HEADER_IMAGE_URL = 'https://cdn.discordapp.com/attachments/825674445342638120/916820978900824084/discord_banner.png';
const SOCIAL_IMAGE_URL = 'https://cdn.discordapp.com/attachments/825674445342638120/909527268714496000/social_media.png';
const SUPPORT_IMAGE_URL = 'https://cdn.discordapp.com/attachments/825674445342638120/909527264218210334/support.png';
const HELP_IMAGE_URL = 'https://cdn.discordapp.com/attachments/825674445342638120/909527270564167690/help_and_support.png';
const IMPORTANT_INFO_IMAGE_URL = 'https://cdn.discordapp.com/attachments/825674445342638120/909527271398834226/impt_info.png';

const SOCIAL_EMBED = [
    makeEmbed({
        title: '<:Partnered:921520970123059231> FlyByWireSimulations | Socials',
        description: makeLines([
            '<:FBW:921524619406635050> <https://www.flybywiresim.com>',
            '<:Twitter:921524619406635050> <https://twitter.com/FlyByWireSim>',
            '<:Facebook:921524619406635050> <https://www.facebook.com/FlyByWireSimulations>',
            '<:Youtube:921524619406635050> <https://www.youtube.com/c/FlyByWireSimulations>',
            '<:Twitch:921524619406635050> <https://www.twitch.tv/flybywiresimulations>',
        ])
    })
]

const SUPPORT_EMBED = [
    makeEmbed({
        title: '<:Partnered:921524619406635050> FlyByWireSimulations | Support Us',
        description: makeLines([
            'You are able to voluntarily support us financially to ensure we are able to cover the costs of servers and developmental resources.',
            '',
            'https://opencollective.com/flybywire'
        ])
    })
]

const IMPORTANT_INFO_EMBED = [
    makeEmbed({
        title: '<:Partnered:921524619406635050> FlyByWireSimulations | Important Info',
        description: 'By being a member of our Discord Server, you agree to the following, and failure to do so can result in removal from the server.',
        fields: [
            {
                name: `Appropriate Content`,
                value: "We want to promote a healthy environment in our Discord server. To maintain this, we will not tolerate inappropriate names, profile pictures, messages or emotes that may offend others in the community. Alongside this we do not welcome any form of spam, the distribution or conversation of pirated material, or general disturbances in our channels and voice chat. \n\nModerators and Admins reserve the right to mute or remove any member they see violating the rules without prior notice.\n\nAvoiding mutes or bans will result in further action being taken to safeguard the Discord community. \n",
            },
            {
                name: `Discord Policies`,
                value: "Please read the Discord TOS and Guidelines listed below!\n\nDiscord Terms of Service & Guidelines\n\n• https://discordapp.com/terms\n\n• https://discordapp.com/guidelines \n",
            },
        ],
    }),
];

const HELP_EMBED = [
    makeEmbed({
        title: '<:Partnered:921524619406635050> FlyByWireSimulations | Help and Support',
        fields: [
            {
                name: `Documentation`,
                value: "Guides & Support Information: https://docs.flybywiresim.com/ \n",
            },
            {
                name: `FAQ`,
                value: "Always check <#751774575464939580>, <#771435594445226005>, and our documentation site to see if your question has already been answered. If not head over to <#785976111875751956> for assistance. \n",
            },
            {
                name: `Flight School`,
                value: "We've opened our <#887806920252076053> channel for any questions you have pertaining to the the operation of the A32NX or general questions about flying an aircraft in the simulator. \n",
            },

        ],
    }),
];

export const welcome: CommandDefinition = {
    name: 'welcome',
    description: 'Sends the welcome',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send({ files: [ HEADER_IMAGE_URL  ]});

        await msg.channel.send('Welcome to the **Official Discord Server** of **FlyByWire Simulations!**\n\nThe A32NX Project is a community-driven open source project to create a free Airbus A320neo in Microsoft Flight Simulator that is as close to reality as possible. It started out as an enhancement project to the default A320neo and is now proceeding as an independent add-on project aiming to bring the FlyByWire A32NX up to payware-level systems depth and functionality, all for free.\n\nWe are also developing an A380 from scratch which will be aiming to produce a high fidelity freeware aircraft.\n\nFeel free to download, test, and share your feedback, or if you are interested in developing, assign your <#751780817772216401>, and get cracking!');

        await msg.channel.send({ files: [ SOCIAL_IMAGE_URL ]});

        await msg.channel.send(SOCIAL_EMBED);

        await msg.channel.send({ files: [ SUPPORT_IMAGE_URL ]});

        await msg.channel.send(SUPPORT_EMBED);

        await msg.channel.send({ files: [ HELP_IMAGE_URL ]});

        await msg.channel.send(HELP_EMBED);

        await msg.channel.send({ files : [ IMPORTANT_INFO_IMAGE_URL ]});

        await msg.channel.send(IMPORTANT_INFO_EMBED);

    },
};
