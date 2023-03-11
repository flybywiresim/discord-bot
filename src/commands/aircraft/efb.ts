import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const EFB_URL = `${process.env.IMAGE_BASE_URL}a32nx/efb_downscaled.gif`;

const efbEmbed = makeEmbed({ image: { url: EFB_URL } });

export const efb: MessageCommandDefinition = {
    name: 'efb',
    description: 'Inquire about the state of the EFB',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: efbEmbed,
};
