import { Colors, EmbedField } from 'discord.js';
import { JSDOM } from 'jsdom';
import { CommandDefinition, replyWithEmbed } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import Logger from '../../lib/logger';

const FBW_DOCS_REPORTED_ISSUES_URL = 'https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/';
const FBW_DOCS_AUTOPILOT_ISSUES_URL = 'https://docs.flybywiresim.com/fbw-a32nx/feature-guides/autopilot-fbw/#typical-issues-and-how-to-solve-them';

const genericReportedIssuesEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: `Please see [this link](${FBW_DOCS_REPORTED_ISSUES_URL}) for a current list of reported issues.`,
});

const issueInSubsectionEmbed = (fields: EmbedField[]) => makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: 'Your issue is in our reported issues list. Please try the possible solutions in the following link(s) and report back if they didn\'t help. Include all the steps you tried.',
    fields,
});

const subsectionLinkEmbedField = (id: string, title: string): EmbedField[] => [
    {
        inline: false,
        name: `${title}`,
        value: `[Link to reported issues section](${FBW_DOCS_REPORTED_ISSUES_URL}#${id})`,
    },
];

const autopilotEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: `Please see [this link](${FBW_DOCS_AUTOPILOT_ISSUES_URL}) for typical issues with the custom autopilot and how to solve them.`,
});

const tooManyResultsEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Error',
    description: 'The search term returned too many results',
    color: Colors.Red,
});

export const reportedissues: CommandDefinition = {
    name: ['reportedissues', 'issues'],
    description: 'Provides a link to the reported issues page within docs',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        try {
            const args = msg.content.split(/\n|\r|\.|-|>/)
                .at(1).toLowerCase().trim()
                .split(/\s+/)
                .slice(1)
                .filter((word) => word.length > 2);

            if (args === undefined || args.length === 0) {
                replyWithEmbed(msg, genericReportedIssuesEmbed);
                return;
            }
            if (args.length === 1 && args.at(0) === 'autopilot') {
                replyWithEmbed(msg, autopilotEmbed);
                return;
            }

            const reportedIssues = [];
            const dom = await JSDOM.fromURL(`${FBW_DOCS_REPORTED_ISSUES_URL}`);
            const { document } = dom.window;
            const h3Elements = document.querySelectorAll('h3');
            h3Elements.forEach((element) => {
                const { id } = element;
                if (args.every((searchWord) => id.toLowerCase().includes(searchWord))) {
                    reportedIssues.push({ id, title: element.textContent });
                }
            });

            if (reportedIssues.length === 0 || reportedIssues.length > 4) {
                if (reportedIssues.length > 4) {
                    msg.reply({ embeds: [tooManyResultsEmbed] });
                }
                replyWithEmbed(msg, genericReportedIssuesEmbed);
                return;
            }

            const fields = reportedIssues.map((sectionElement) => subsectionLinkEmbedField(sectionElement.id, sectionElement.title)).flat();
            replyWithEmbed(msg, issueInSubsectionEmbed(fields));

            return;
        } catch (e) {
            Logger.error(e);
            Logger.error(e.stack);
            const errorEmbed = makeEmbed({
                title: 'Error | Reported Issues',
                description: e.message,
                color: Colors.Red,
            });
            msg.reply({ embeds: [errorEmbed] });
        }
    },
};
