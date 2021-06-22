import discord from 'discord.js';
import { Colors } from '../constants';

export function makeEmbed(embed): discord.MessageEmbed {
    return new discord.MessageEmbed({
        ...embed,
        color: Colors.FBW_CYAN,
    });
}
