import discord from 'discord.js';
import { Colors } from '../constants';

export function makeEmbed(embed: discord.MessageEmbedOptions): discord.MessageEmbed {
    return new discord.MessageEmbed({
        color: Colors.FBW_CYAN,
        ...embed,
    });
}

export function makeLines(lines: string[]): string {
    return lines.join('\n');
}
