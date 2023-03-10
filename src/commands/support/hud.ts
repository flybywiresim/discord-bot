import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const hudEmbed = makeEmbed({
    title: 'FlyByWire Support | Disable in game HUD',
    description: 'Please turn off \'INSTRUMENTS HEADS UP DISPLAY - CHASE CAM\' and \'COCKPIT CAM\' in Settings > Assistance Options > User Experience ',
    image: { url: 'https://cdn.discordapp.com/attachments/752801628347957248/927195966547824710/unknown.png' },
});

export const hud: MessageCommandDefinition = {
    name: 'hud',
    description: 'How to disable in-game HUD',
    category: CommandCategory.SUPPORT,
    genericEmbed: hudEmbed,
};
