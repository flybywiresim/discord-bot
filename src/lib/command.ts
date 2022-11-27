import { Client, EmbedBuilder, Message, PermissionsString } from 'discord.js';
import { CommandCategory } from '../constants';

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
