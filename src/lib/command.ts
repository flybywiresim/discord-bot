import discord from 'discord.js';
import { CommandCategory } from '../constants';

export interface CommandDefinition {
    name: string | string[],
    description?: string,
    category?: CommandCategory,
    executor: (msg: discord.Message) => void,
}
