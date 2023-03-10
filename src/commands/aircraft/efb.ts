import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const EFB_URL = 'https://cdn.discordapp.com/attachments/897491699167793182/998861972093276180/efbnew.gif';

const efbEmbed = makeEmbed({ image: { url: EFB_URL } });

export const efb: MessageCommandDefinition = {
    name: 'efb',
    description: 'Inquire about the state of the EFB',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: efbEmbed,
};
