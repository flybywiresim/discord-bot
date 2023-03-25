import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { Channels, CommandCategory, Roles, RoleGroups, imageBaseUrl } from '../../constants';

const FLIGHT_DECK_IMAGE_URL = `${imageBaseUrl}/moderation/faq.png`;

const faqEmbeds = [
    makeEmbed({
        title: 'FAQ',
        fields: [
            {
                name: 'Where can I download the A32NX addon?',
                value: makeLines([
                    '> You can download the Stable, Development and Experimental builds using our installer: https://api.flybywiresim.com/installer',
                    '',
                    '> You can also download the addon directly from the GitHub to install manually: https://github.com/flybywiresim/a32nx',
                ]),
            },
            {
                name: 'When is the Next Update?',
                value: makeLines([
                    `> We don't know when the next update will be, however you can keep track of development in <#${Channels.PROGRESS}> and we will send an update into <#${Channels.A32NX_RELEASE}> upon a new stable release.`,
                    '',
                    '> You can also see the latest changes to the development version [here.](https://github.com/flybywiresim/a32nx/blob/master/.github/CHANGELOG.md)',
                ]),
            },
            {
                name: 'How do I join the team?',
                value: `> Head over to <#${Channels.ROLES}>, where you can also find out who to contact should your role not be available.
`,
            },
            {
                name: 'Is it payware?',
                value: '> No, it is completely free and open-source.',
            },
            {
                name: 'How do we install this aircraft?',
                value: '> You can use the A32NX installer linked above, which performs the download and installation automatically. If you chose to download the addon manually through GitHub, please see our [detailed installation guide.](https://docs.flybywiresim.com/fbw-a32nx/installation/)',
            },
            {
                name: 'Where do we report bugs?',
                value: `> Report it in <#${Channels.A32NX_SUPPORT}> for one of our developers to see.`,
            },
            {
                name: 'Where is the plane in-sim?',
                value: "> The A32NX is now a separate aircraft from the default, you need to select this aircraft in the 'aircraft selection' menu prior to loading the flight.",
            },
            {
                name: 'What are the liveries available?',
                value: '> Liveries working for the default A320neo will not be compatible with the A32NX. We recommend downloading your liveries from: https://flightsim.to/c/liveries/flybywire-a32nx/',
            },
            {
                name: 'Why is my version not the same as what I see others using?',
                value: `> We have three versions, Stable, Development (Master) and Experimental. The Stable version is a 'snapshot' of the development which we regard as stable with the current version of the simulator. The Development build is updated daily and is a constant work in progress and although we test each update thoroughly, minor issues may occur from time to time. If you find this to be the case, you can report these issues in <#${Channels.A32NX_SUPPORT}>.`,
            },
            {
                name: 'I am a real life Aero Engineer, GA, A320 or A380 Pilot, or Cabin Crew. Where do I get my role?',
                value: `> You simply DM one of the <@&${Roles.MODERATION_TEAM}> with proof of your job!`,
            },

        ],
    }),
    makeEmbed({
        title: 'Links',
        fields: [
            {
                name: 'Docs FAQ',
                value: '> https://docs.flybywiresim.com/fbw-a32nx/faq/',
            },
            {
                name: 'Beginner Guide',
                value: '> https://docs.flybywiresim.com/pilots-corner/beginner-guide/overview/',
            },
            {
                name: 'Flight School',
                value: `> <#${Channels.FLIGHT_SCHOOL}>`,
            },
        ],
    }),
];

export const faq: CommandDefinition = {
    name: 'faq',
    description: 'Sends the FAQ',
    requirements: { roles: RoleGroups.STAFF },
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send({ files: [FLIGHT_DECK_IMAGE_URL] });
        await Promise.all(faqEmbeds.map(async (faqEmbed) => {
            await msg.channel.send({ embeds: [faqEmbed] });
        }));
    },
};
