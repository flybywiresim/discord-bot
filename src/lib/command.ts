import { Client, EmbedBuilder, Message, PermissionsString, GuildMember, Colors } from 'discord.js';
import { CommandCategory, Roles, Channels, Threads, PermissionsEmbedDelay } from '../constants';
import { makeEmbed } from './embed';

export interface CommandPermissions {
    permissions?: PermissionsString[],
    permissionsError?: string,
    roles?: Roles[],
    rolesError?: string,
    rolesBlacklist?: boolean,
    channels?: (Channels | Threads)[],
    channelsError?: string,
    channelsBlacklist?: boolean,
    quietErrors?: boolean,
    verboseErrors?: boolean,
}

export interface BaseCommandDefinition {
    name: string | string[],
    description?: string,
    category?: CommandCategory,
    requirements?: CommandPermissions,
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

export function hasRequiredPermissions(requirements: CommandPermissions, member: GuildMember, channelId: string): [boolean, string] {
    // bail if no requirements defined
    if (!requirements) {
        return [true, ''];
    }

    // check requirement precursors
    const hasAllPermissions = requirements.permissions && requirements.permissions.every((permission) => member.permissions.has(permission));

    const hasAnyRole = requirements.roles && requirements.roles.some((role) => member.roles.cache.has(role));

    const isInChannel = requirements.channels && requirements.channels.some((c) => c.toString() === channelId);

    // check requirements
    const meetsPermissionRequirement = !requirements.permissions || hasAllPermissions;
    const meetsRolesRequirement = !requirements.roles
                                  || (hasAnyRole && !requirements.rolesBlacklist)
                                  || (!hasAnyRole && requirements.rolesBlacklist);
    const meetsChannelRequirement = !requirements.channels
                                  || (isInChannel && !requirements.channelsBlacklist)
                                  || (!isInChannel && requirements.channelsBlacklist);

    // return permissions error if needed
    if (!meetsPermissionRequirement) {
        if (requirements.quietErrors) {
            return [false, ''];
        } if (requirements.permissionsError) {
            return [false, requirements.permissionsError];
        } if (requirements.verboseErrors) {
            const errorText = `The ${requirements.permissions.join(', ')} permission${requirements.permissions.length > 1 ? 's are' : ' is'} required to use that!`;
            return [false, errorText];
        }
        return [false, 'You don\'t have the permissions to use that!'];
    }

    // return roles error if needed
    if (!meetsRolesRequirement) {
        if (requirements.quietErrors) {
            return [false, ''];
        } if (requirements.rolesError) {
            return [false, requirements.rolesError];
        } if (requirements.verboseErrors) {
            let errorText: string;

            if (requirements.rolesBlacklist) {
                errorText = `The ${requirements.roles.map((r) => member.guild.roles.cache.get(r).name).join(', ')} role${requirements.roles.length > 1 ? 's are' : ' is'} not allowed to use that!`;
            } else {
                errorText = `Only the ${requirements.roles.map((r) => member.guild.roles.cache.get(r).name).join(', ')} role${requirements.roles.length > 1 ? 's are' : ' is'} allowed to use that!`;
            }

            return [false, errorText];
        }
        return [false, 'You don\'t have the required roles to use that!'];
    }

    // return channel error if needed
    if (!meetsChannelRequirement) {
        if (requirements.quietErrors) {
            return [false, ''];
        } if (requirements.channelsError) {
            return [false, requirements.channelsError];
        } if (requirements.verboseErrors) {
            let errorText: string;

            if (requirements.channelsBlacklist) {
                errorText = `That can't be used in ${requirements.channels.map((c) => member.guild.channels.cache.get(c).toString()).join(', ')}!`;
            } else {
                errorText = `That can only be used in ${requirements.channels.map((c) => member.guild.channels.cache.get(c).toString()).join(', ')}!`;
            }

            return [false, errorText];
        }
        return [false, 'That can\'t be used here!'];
    }

    // all checks have passed, we're cleared for liftoff
    return [true, ''];
}

export async function sendPermissionsEmbed(msg: Message, error: string) {
    // return silently for quiet error commands
    if (!msg || !error) {
        return;
    }

    const permEmbed = makeEmbed({
        color: Colors.Red,
        title: 'Command Requirements',
        description: error,
    });
    const permMsg = await msg.reply({ embeds: [permEmbed] });
    if (PermissionsEmbedDelay && PermissionsEmbedDelay > 0) {
        setTimeout(() => permMsg.delete(), PermissionsEmbedDelay); // Delete after 10 seconds
    }
}

export async function replyWithEmbed(msg: Message, embed: EmbedBuilder) : Promise<Message<boolean>> {
    return msg.fetchReference()
        .then((res) => {
            let existingFooterText = '';
            const existingFooter = embed.data.footer;
            if (existingFooter) {
                existingFooterText = `${existingFooter.text}\n\n`;
            }
            embed = EmbedBuilder.from(embed.data);
            embed.setFooter({ text: `${existingFooterText}Executed by ${msg.author.tag} - ${msg.author.id}` });
            return res.reply({ embeds: [embed] });
        })
        .catch(() => msg.reply({ embeds: [embed] }));
}

export async function replyWithMsg(msg: Message, text: string) : Promise<Message<boolean>> {
    return msg.fetchReference()
        .then((res) => res.reply(`${text}\n\n\`Executed by ${msg.author.tag} - ${msg.author.id}\``))
        .catch(() => msg.reply(text));
}
