import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const TAKEOFF_ISSUES_IMAGE_URL = 'https://cdn.discordapp.com/attachments/819557805912621056/998403696343928852/engines1.png';

export const takeoffIssues: CommandDefinition = {
    name: ['takeoffissues', 'toi', 'engines', 'eng'],
    description: 'Help with engine issues on takeoff',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const contentEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Engine Issues on Takeoff',
            description: makeLines([
                'Engine shut down on takeoff is caused by the \'ENGINE AUTOSTOP\' and \'AUTO START ENGINE\' bindings. Please make sure that you unbind these in the controls options.',
                '',
                'Engines going to idle on takeoff is caused by piloting assistance being enabled, turn those off by setting the piloting category to \'HARD\'.',
            ]),
            image: { url: TAKEOFF_ISSUES_IMAGE_URL },
        });

        await msg.channel.send({ embeds: [contentEmbed] });
    },
};
