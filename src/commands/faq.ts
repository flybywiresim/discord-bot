import { CommandDefinition } from '../lib/command';
import { makeEmbed, makeLines } from '../lib/embed';
import { CommandCategory } from '../constants';

const FLIGHT_DECK_IMAGE_URL = 'https://media.discordapp.net/attachments/838062729398976522/889484404697743381/unknown.png?width=1214&height=683';

const embeds = [
    makeEmbed({
        title: 'FAQ',
        fields: [
            {
                name: `Where can I download the A32NX addon?`,
                value: "> You can download the Stable, Development and Experimental builds using our installer: https://api.flybywiresim.com/installer\n\n> You can also download the addon directly from the GitHub to install manually: https://github.com/flybywiresim/a32nx\n ",
            },
            {
                name: `When is the Next Update?`,
                value: "> We don't know when the next update will be, however you can keep track of development in <#747971332301389935> and we will send an update into <#747575878170574858> upon a new stable release.\n\n> You can also see the latest changes to the development version [here.](https://github.com/flybywiresim/a32nx/blob/master/.github/CHANGELOG.md)\n ",
            },
            {
                name: `How do I join the team?`,
                value: "> Head over to <#751780817772216401>, where you can also find out who to contact should your role not be available.\n",
            },
            {
                name: `Is it payware?`,
                value: "> No, it is completely free and open-source.\n ",
            },
            {
                name: `How do we install this aircraft?`,
                value: '> You can use the A32NX installer linked above, which performs the download and installation automatically. If you chose to download the addon manually through GitHub, please see our [detailed installation guide.](https://docs.flybywiresim.com/fbw-a32nx/installation/)\n ',
            },
            {
                name: `Where do we report bugs?`,
                value: "> Report it in <#785976111875751956> for one of our developers to see.\n ",
            },
            {
                name: `Where is the plane in-sim?`,
                value: "> The A32NX is now a separate aircraft from the default, you need to select this aircraft in the 'aircraft selection' menu prior to loading the flight.\n ",
            },
            {
                name: `What are the liveries available?`,
                value: "> Liveries working for the default A320neo will not be compatible with the A32NX. We recommend downloading your liveries from: https://flightsim.to/c/liveries/flybywire-a32nx/\n ",
            },
            {
                name: `Why is my version not the same as what I see others using?`,
                value: "> We have three versions, Stable, Development (Master) and Experimental. The Stable version is a 'snapshot' of the development which we regard as stable with the current version of the simulator. The Development build is updated daily and is a constant work in progress and although we test each update thoroughly, minor issues may occur from time to time. If you find this to be the case, you can report these issues in <#785976111875751956>.\n ",
            },
            {
                name: `I am a real life Aero Engineer, GA, A320 or A380 Pilot, or Cabin Crew. Where do I get my role?`,
                value: "> You simply DM <@540637101302087703> or <@206276286782504960> with proof of your job!\n ",
            },

        ],
    }),
    makeEmbed({
        title: 'Links',
        fields: [
            {
                name: `Docs FAQ`,
                value: "> https://docs.flybywiresim.com/fbw-a32nx/support/faq/\n ",
            },
            {
                name: `Beginner Guide`,
                value: "> https://docs.flybywiresim.com/pilots-corner/beginner-guide/overview/\n ",
            },
            {
                name: `Flight School`,
                value: "> <#887806920252076053>\n ",
            },
        ],
    }),
];

export const faq: CommandDefinition = {
    name: 'faq',
    description: 'Sends the FAQ',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send({ files: [ FLIGHT_DECK_IMAGE_URL  ]});
        await Promise.all(embeds.map(async (embed) => {
            await msg.channel.send(embed);
        }));
    },
};

