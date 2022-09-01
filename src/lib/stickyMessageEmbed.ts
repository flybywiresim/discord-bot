import { Colors } from '../constants';
import { makeEmbed } from './embed';

export const STICKY_MESSAGE_TITLE = 'Stickied Message';
export const STICKY_MOD_TITLE = 'Sticky Message - Log';

export const stickyMessageEmbed = (description: string, imageUrl: string) => makeEmbed({
    title: STICKY_MESSAGE_TITLE,
    description,
    color: Colors.FBW_PINK,
    image: imageUrl ? { url: imageUrl } : null,
});
