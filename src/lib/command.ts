import { Client, Message, PermissionsString } from 'discord.js';
import { CommandCategory, Roles, Channels, Threads } from '../constants';

export interface CommandRequirements {
    permissions?: PermissionsString[],
    permissionsError?: string,
    roles?: Roles[],
    rolesError?: string,
    rolesBlacklist?: boolean,
    channels?: (Channels | Threads)[],
    channelsError?: string,
    channelsBlacklist?: boolean,
    verboseErrors?: boolean, // will be overridden by any specific errors
}

export interface CommandDefinition {
    name: string | string[],
    description?: string,
    category?: CommandCategory,
    requirements?: CommandRequirements,
    executor: (msg: Message, client?: Client) => Promise<any>,
}
