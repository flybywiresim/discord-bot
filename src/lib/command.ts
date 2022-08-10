import { Client, Message, PermissionsString } from 'discord.js';
import { CommandCategory } from '../constants';

export interface CommandDefinition {
    name: string | string[],
    description?: string,
    category?: CommandCategory,
    requiredPermissions?: PermissionsString[],
    executor: (msg: Message, client?: Client) => Promise<any>,
}
