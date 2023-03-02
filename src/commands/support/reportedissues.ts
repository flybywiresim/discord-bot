import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { getConn } from '../../lib/db';
import Logger from '../../lib/logger';
import ReportedIssue from '../../lib/schemas/reportedIssuesSchema';

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

const noDbConnEmbed = makeEmbed({
    title: 'Reported Issues - No Connection',
    description: 'Could not connect to the database.',
    color: Colors.Red,
});

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
            const dbConn = getConn();
            if (!dbConn) {
                await msg.channel.send({ embeds: [noDbConnEmbed] });
            }

            const args = msg.content.split(/\s+/).slice(1);
            if ((args.length < 1 && parseInt(args[1]) !== 0) || !dbConn) {
                await msg.channel.send({ embeds: [genericReportedIssuesEmbed] });
                return;
            }

            let subCommand = args[0].toLowerCase();
            let [subArgs] = args.slice(1);
            if (subCommand !== 'show' && subCommand !== 'update') {
                subCommand = 'show';
                [subArgs] = args;
            }
            subArgs = subArgs.replace('+', '.*');

            if (subCommand === 'show') {
                let reportedIssues = [];
                try {
                    reportedIssues = await ReportedIssue.find({ id: { $regex: `.*${subArgs}.*` } });
                    if (!reportedIssues || reportedIssues.length === 0) {
                        await msg.channel.send({ embeds: [notFoundEmbed('Show', subArgs)] });
                        return;
                    }
                } catch {
                    await msg.channel.send({ embeds: [notFoundEmbed('Show', subArgs)] });
                    return;
                }

                const fields = reportedIssues.map((reportedIssue) => {
                    const { id } = reportedIssue;
                    return foundIssueEmbedFields(id);
                }).flat();

                await msg.channel.send({ embeds: [foundIssuesEmbed(fields)] });

                return;
            }

            if (subCommand === 'update') {
                const dom = await JSDOM.fromURL(`${FBW_DOCS_REPORTED_ISSUES_URL}`);
                const { document } = dom.window;
                const h3Elements = document.querySelectorAll('h3');
                h3Elements.forEach((element) => {
                    const { id } = element;
                    const elementId = new ReportedIssue({
                        id,
                    });
                    try {
                        ReportedIssue.deleteMany();
                        elementId.save();
                    } catch {
                        return;
                    }
                });
            }
        } catch (e) {
            Logger.error(e);
            const errorEmbed = makeEmbed({
                title: 'Error | Reported Issues',
                description: e.message,
                color: Colors.Red,
            });
            msg.channel.send({ embeds: [errorEmbed] });
        }
    },
};
