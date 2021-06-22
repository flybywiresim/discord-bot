import discord from 'discord.js';

export interface CommandDefinition {
    name: string,
    executor: (msg: discord.Message) => void,
}
