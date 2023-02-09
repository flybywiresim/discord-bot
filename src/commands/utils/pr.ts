import { request } from '@octokit/request';
import { Colors } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Roles } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const syntaxHelp = '\nSyntax:\nA32NX repo: `.pr <id>`\nAny FBW repo: `.pr <repo> <id>`';
const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MEDIA_TEAM,
    Roles.MODERATION_TEAM,
    Roles.DEVELOPMENT_TEAM,
    Roles.BOT_DEVELOPER,
    Roles.CONTRIBUTOR,
    Roles.QA_TRAINEE,
    Roles.QA_TESTER,
];

const noQueryEmbed = makeEmbed({
    title: 'PR Error | Missing Query',
    description: `Invalid command!${syntaxHelp}`,
    color: Colors.Red,
});

const invalidEmbed = makeEmbed({
    title: 'PR Error | Invalid',
    description: `Something went wrong! Did you provide the correct repo/PR id?${syntaxHelp}`,
    color: Colors.Red,
});

export const pr: CommandDefinition = {
    name: 'pr',
    description: `Retrieves the link of the provided GitHub PR.${syntaxHelp}`,
    category: CommandCategory.UTILS,
    requirements: { roles: permittedRoles },
    executor: async (msg) => {
        const command = msg.content.replace('.', '').split(/ +/);

        if (/\.pr +#?\d+/i.test(msg.content)) {
            command[1] = command[1].replace('#', '');
            try {
                const response = await request('GET /repos/flybywiresim/a32nx/pulls/{pull_number}', { pull_number: command[1] });
                return msg.channel.send(response.data.html_url);
            } catch {
                return msg.reply({ embeds: [invalidEmbed] });
            }
        }
        if (/\.pr +[\w-]+ +#?\d+/i.test(msg.content)) {
            command[2] = command[2].replace('#', '');
            try {
                const response = await request('GET /repos/flybywiresim/{repo}/pulls/{pull_number}', {
                    repo: command[1],
                    pull_number: command[2],
                });
                return msg.channel.send(response.data.html_url);
            } catch {
                return msg.reply({ embeds: [invalidEmbed] });
            }
        }
        return msg.reply({ embeds: [noQueryEmbed] });
    },
};
