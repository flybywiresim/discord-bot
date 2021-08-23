import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

export const controls: CommandDefinition = {
    name: 'controls',
    description: 'Instructions on how to switch back to legacy controls and how to use new controls',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'MSFS | Cockpit Interaction System',
        fields: [
            {
                name: 'Legacy Cockpit Interaction System',
                value: '> Go to menu'
                        + '\n> General Options'
                        + '\n> Accessibility'
                        + '\n> Find the Cockpit Interaction System setting'
                        + '\n> Change to legacy',
                inline: false,
            },
            {
                name: 'Using the new cockpit interaction system',
                value: '> Highlight a control (like a knob)'
                        + '\n> Hold left click to lock that control. Now your mouse will not affect other controls or other mouse bindings'
                        + '\n> Move the mouse left to turn the knob left, move it right to turn the knob to the right (with left click held down)'
                        + '\n> You can also use the scroll wheel while holding left click down to turn the knob to the left or right'
                        + '\n> To push a control/knob in, lock to the control using left click and then right click'
                        + '\n> To pull a control/knob out, hold left click and then click your scroll wheel (middle mouse)'
                        + '\n> Note: If you already use middle mouse button to activate freelook this may not work.'
                        + ' Check your keybinds so this feature does not conflict',
                inline: false,
            }, 
        ],
    })),
};
    