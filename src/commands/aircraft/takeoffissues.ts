import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const TAKEOFF_ISSUES_IMAGE_URL = `${imageBaseUrl}/a32nx/takeoffissues.png`;

const takeoffIssuesEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Engine Issues on Takeoff',
    description: makeLines([
        'Engine shutdown on takeoff is caused by the \'ENGINE AUTOSTOP\' and \'AUTO START ENGINE\' bindings. Please make sure that you unbind these in the controls options.',
        '',
        'Engines going to idle on takeoff is caused by piloting assistance being enabled, turn those off by setting the piloting category to \'HARD\'.',
    ]),
    image: { url: TAKEOFF_ISSUES_IMAGE_URL },
});

export const takeoffIssues: MessageCommandDefinition = {
    name: ['takeoffissues', 'toi', 'engines', 'eng'],
    description: 'Help with engine issues on takeoff',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: takeoffIssuesEmbed,
};
