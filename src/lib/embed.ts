import { EmbedBuilder, EmbedData } from 'discord.js';
import { Colors } from '../constants';

type ListTypes = 'bullet' | 'ordered';

export function makeEmbed(embed: EmbedData): EmbedBuilder {
    return new EmbedBuilder({
        color: Colors.FBW_CYAN,
        ...embed,
    });
}

export function makeLines(lines: string[]): string {
    return lines.join('\n');
}

export const makeList = (lines: string[], type?: ListTypes): string => {
    switch (type) {
    case 'bullet':
        return lines.map((line) => `• ${line}`).join('\n');
    case 'ordered':
        return lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
    default:
        return lines.map((line) => `- ${line}`).join('\n');
    }
};
