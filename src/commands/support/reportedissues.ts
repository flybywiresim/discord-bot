import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import Logger from '../../lib/logger';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const FBW_DOCS_REPORTED_ISSUES_URL = 'https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/';

const genericReportedIssuesEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: `Please see [this link](${FBW_DOCS_REPORTED_ISSUES_URL}) for a current list of reported issues.`,
});

const foundIssuesEmbed = (fields: EmbedField[]) => makeEmbed({
    title: 'FlyByWire A32NX | Reported Issues',
    description: 'Your issue is in our reported issues list. Please try the possible solutions in the following link(s) and report back if it didn\'t help, with all the steps you tried.',
    fields,
});

const foundIssueEmbedFields = (id: string): EmbedField[] => [
    {
        inline: false,
        name: `${id.replace(/-/gi, ' ')}`,
        value: `[link to reported issue section](${FBW_DOCS_REPORTED_ISSUES_URL}#${id})`,
    },
];

const notFoundEmbed = (action: string, command: string) => makeEmbed({
    title: `Reported Issues - ${action} - ${command} not found`,
    description: 'No reported issue matching the search can be found.',
    color: Colors.Red,
});

export const reportedissues: CommandDefinition = {
    name: ['reportedissues', 'issues'],
    description: 'Provides a link to the reported issues page within docs',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        try {
            let [args] = msg.content.split(/\s+/).slice(1);
            if ((args.length < 1 && parseInt(args[1]) !== 0)) {
                await msg.channel.send({ embeds: [genericReportedIssuesEmbed] });
                return;
            }

            args = args.replace('+', '*').toLowerCase();

            const reportedIssues = [];
            const dom = await JSDOM.fromURL(`${FBW_DOCS_REPORTED_ISSUES_URL}`);
            const { document } = dom.window;
            const h3Elements = document.querySelectorAll('h3');
            h3Elements.forEach((element) => {
                const { id } = element;
                if (id.toLowerCase().match(new RegExp(`${args}`))) {
                    reportedIssues.push(id);
                }
            });

            if (reportedIssues.length === 0) {
                await msg.channel.send({ embeds: [notFoundEmbed('Show', args)] });
                return;
            }

            const fields = reportedIssues.map((id) => foundIssueEmbedFields(id)).flat();
            await msg.channel.send({ embeds: [foundIssuesEmbed(fields)] });

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
