import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const genericBotIssueEmbed = makeEmbed({
    title: 'FlyByWire Discord Bot | Opening an Issue or Feature request',
    description: 'You can open an issue or feature request for the FlyByWire Discord Bot using [this link](https://github.com/flybywiresim/discord-bot/issues/new/choose).',
});

export const botIssue: MessageCommandDefinition = {
    name: ['botissue', 'bot-issue', 'botfeature', 'bot-feature', 'botfeat'],
    category: CommandCategory.SUPPORT,
    description: 'Provides details on where to create a FBW Discord Bot Issue or Feature Request.',
    genericEmbed: genericBotIssueEmbed,
};
