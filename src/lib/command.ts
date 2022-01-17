import discord from 'discord.js';
import { CommandCategory } from '../constants';

export interface CommandRoleModel {
    [guildId: string]: string[]
}

export interface CommandDefinition {
    name: string | string[],
    description?: string,
    category?: CommandCategory,
    requiredPermissions?: discord.PermissionString[],
    requiredRoles?: CommandRoleModel,
    executor: (msg: discord.Message, client?: discord.Client) => Promise<any>,
}
