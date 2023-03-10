import { Colors, EmbedField } from 'discord.js';
import { JSDOM } from 'jsdom';
import { CommandDefinition } from '../../lib/command';
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
    description: 'Your issue is in our reported issues list. Please try the possible solutions in the following link(s) and report back if it didn\'t help, with all the steps you tried.',
    fields,
});

const subsectionLinkEmbedField = (id: string): EmbedField[] => [
    {
        inline: false,
        name: `${id.replace(/-/gi, ' ')}`,
        value: `[link to reported issue section](${FBW_DOCS_REPORTED_ISSUES_URL}#${id})`,
    },
];

const autopilotEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: `Please see [this Link](${FBW_DOCS_AUTOPILOT_ISSUES_URL}) for typical issues with the custom autopilot and how to solve them.`,
});

const tooManyResultsEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Error',
    description: 'The search term returned too many results',
    color: Colors.Red,
});

const reportedissuesEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: 'Please see [this link](https://docs.flybywiresim.com/reported-issues/) for a current list of reported issues.',
});

export const reportedissues: MessageCommandDefinition = {
    name: ['reportedissues', 'issues'],
    description: 'Provides a link to the reported issues page within docs',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        try {
            const args = msg.content.split(/\.|\n|\r|>/)
                .at(1).toLowerCase().trim()
                .split(/\s+/)
                .slice(1)
                .filter((word) => word.length > 2);

            if (args === undefined || args.length === 0) {
                msg.channel.send({ embeds: [genericReportedIssuesEmbed] });
                return;
            }
            if (args.length === 1 && args.at(0) === 'autopilot') {
                msg.channel.send({ embeds: [autopilotEmbed] });
                return;
            }

            const reportedIssues = [];
            const dom = await JSDOM.fromURL(`${FBW_DOCS_REPORTED_ISSUES_URL}`);
            const { document } = dom.window;
            const h3Elements = document.querySelectorAll('h3');
            h3Elements.forEach((element) => {
                const { id } = element;
                if (args.every((searchWord) => id.toLowerCase().includes(searchWord))) {
                    reportedIssues.push(id);
                }
            });

            if (reportedIssues.length === 0 || reportedIssues.length > 4) {
                if (reportedIssues.length > 4) {
                    msg.reply({ embeds: [tooManyResultsEmbed] });
                }
                msg.channel.send({ embeds: [genericReportedIssuesEmbed] });
                return;
            }

            const fields = reportedIssues.map((id) => subsectionLinkEmbedField(id)).flat();
            msg.channel.send({ embeds: [issueInSubsectionEmbed(fields)] });

            return;
        } catch (e) {
            Logger.error(e);
            Logger.error(e.stack);
            const errorEmbed = makeEmbed({
                title: 'Error | Reported Issues',
                description: e.message,
                color: Colors.Red,
            });
            msg.channel.send({ embeds: [errorEmbed] });
        }
    },
};
