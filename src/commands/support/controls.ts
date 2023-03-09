import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const controlsEmbed = makeEmbed({
    title: 'MSFS | Cockpit Interaction System',
    fields: [
        {
            name: 'Lock or Legacy? ',
            value: makeLines([
                'Sim Update 5 introduced a new cockpit interaction system, which changes the way you interact with different buttons and switches. You can find out more on the new interaction system [here](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/#cockpit-interaction-system), or if you\'d prefer to switch back to the old way:',
                '',
                ' - Open the settings menu.',
                ' - Select \'General Options\' and then select \'Accessibility\'.',
                ' - Find the \'Cockpit Interaction System\' option and set this to Legacy.',
            ]),
            inline: false,
        },
    ],
});

export const controls: MessageCommandDefinition = {
    name: ['controls', 'legacy'],
    description: 'Instructions on how to switch back to legacy controls and how to use new controls',
    category: CommandCategory.SUPPORT,
    genericEmbed: controlsEmbed,
};
