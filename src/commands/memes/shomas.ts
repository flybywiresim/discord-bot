import { CommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SHOMAS_URL = 'https://cdn.discordapp.com/attachments/898602626436964402/957583747560144946/Screenshot_20220324-132414_Inspect_and_Edit_HTML_Live.png';

export const shomas: CommandDefinition = {
    name: 'shomas',
    description: 'oldest pilot',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const shomasEmbed = makeEmbed({ image: { url: SHOMAS_URL } });
        return msg.channel.send({ embeds: [shomasEmbed] });
    },
};
