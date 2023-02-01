import { Client, EmbedBuilder, Message, PermissionsString, GuildMember } from 'discord.js';
import { CommandCategory, Roles, Channels, Threads } from '../constants';

export interface CommandPermissions {
    permissions?: PermissionsString[],
    permissionsError?: string,
    roles?: Roles[],
    rolesError?: string,
    rolesBlacklist?: boolean,
    channels?: (Channels | Threads)[],
    channelsError?: string,
    channelsBlacklist?: boolean,
    verboseErrors?: boolean,
}

export interface BaseCommandDefinition {
    name: string | string[],
    description?: string,
    category?: CommandCategory,
    requiredPermissions?: PermissionsString[],
}
export interface CommandDefinition extends BaseCommandDefinition {
    executor: (msg: Message, client?: Client) => Promise<any>,
}
export interface MessageCommandDefinition extends BaseCommandDefinition {
    genericEmbed: EmbedBuilder,
    typeEmbeds?: {
        a32nx?: EmbedBuilder,
        a380x?: EmbedBuilder,
    },
}

export function isExecutorCommand(command: BaseCommandDefinition) {
    return 'executor' in command;
}

export function isMessageCommand(command: BaseCommandDefinition) {
    return 'genericEmbed' in command;
}

export function hasRequiredPermissions(command: BaseCommandDefinition, member: GuildMember) {
    // all checks have passed, we're cleared for liftoff
    return true;
}