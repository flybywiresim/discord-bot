import { Colors } from 'discord.js';
import { makeEmbed } from './embed';

export const STICKY_MESSAGE_TITLE = 'Stickied Message';

export const stickyMessageEmbed = (description: string) => makeEmbed({
    title: STICKY_MESSAGE_TITLE,
    description,
    color: Colors.Blurple,
});
