import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const legacy: CommandDefinition = {
    name: 'legacy',
    description: 'Instructions on how to switch back to legacy controls',
    category: CommandCategory.FBW,
    executor: (msg) => {
        msg.channel.send(makeEmbed({
            title: 'Legacy Controls',
            description: 'Go to menu\n'
            + 'General Options\n'
            + 'Accessibility\n'
            + 'Find the cockpit interaction system setting\n'
            + 'Change to legacy'
        }))
    }
}