import { Colors, EmbedField, TextChannel } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, RoleGroups } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { client } from '../..';

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Cache Update - Help',
    description: 'A command to force a cache update of the bot.',
    fields: [
        {
            name: `Updating bans cache: \`${evokedCommand} bans\``,
            value: 'Updates the bans cache by fetching all bans.',
            inline: false,
        },
        {
            name: `Updating channels cache: \`${evokedCommand} channels\``,
            value: 'Updates the channels cache by fetching all channels.',
            inline: false,
        },
        {
            name: `Updating members cache: \`${evokedCommand} members\``,
            value: 'Updates the members cache by fetching all members.',
            inline: false,
        },
        {
            name: `Updating roles cache: \`${evokedCommand} roles\``,
            value: 'Updates the roles cache by fetching all roles.',
            inline: false,
        },
    ],
});

const modLogEmbed = (action: string, fields: any, color: number) => makeEmbed({
    title: `Cache Update - ${action}`,
    fields,
    color,
});

const noChannelEmbed = (action:string, channelName: string) => makeEmbed({
    title: `Sticky Message - ${action} - No ${channelName} channel`,
    description: `The command was successful, but no message to ${channelName} was sent. Please check the channel still exists.`,
    color: Colors.Yellow,
});

const cacheUpdateEmbedField = (moderator: string, cacheType: string, cacheSize: string, duration: string): EmbedField[] => [
    {
        name: 'Type',
        value: cacheType,
        inline: true,
    },
    {
        name: 'Count',
        value: cacheSize,
        inline: true,
    },
    {
        name: 'Moderator',
        value: moderator,
        inline: true,
    },
    {
        name: 'Duration',
        value: `${duration}s`,
        inline: true,
    },
];

export const cacheUpdate: CommandDefinition = {
    name: ['cacheupdate', 'cache-update'],
    description: 'Updates the cache of the bot for a specific cache type.',
    category: CommandCategory.MODERATION,
    requirements: { roles: RoleGroups.STAFF },
    executor: async (msg) => {
        const subCommands = ['bans', 'channels', 'members', 'roles'];

        const modLogsChannel = client.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const { author } = msg;
        const [evokedCommand] = msg.content.trim().split(/\s+/);
        const args = msg.content.replace(evokedCommand, '').trim();
        if (!args || args === 'help') {
            return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
        }

        const [subCommand] = args.split(/\s+/);
        if (!subCommands.includes(subCommand)) {
            return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
        }

        const { bans, channels, members, roles } = msg.guild;
        let cacheSize;
        const start = new Date().getTime();
        switch (subCommand) {
        case 'bans':
            await bans.fetch();
            cacheSize = bans.cache.size;
            break;
        case 'channels':
            await channels.fetch();
            cacheSize = channels.cache.size;
            break;
        case 'members':
            await members.fetch();
            cacheSize = members.cache.size;
            break;
        case 'roles':
            await roles.fetch();
            cacheSize = roles.cache.size;
            break;
        default:
            break;
        }
        const duration = ((new Date().getTime() - start) / 1000).toFixed(2);

        if (cacheSize !== null) {
            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed(subCommand,
                        cacheUpdateEmbedField(
                            author.toString(),
                            subCommand,
                            cacheSize,
                            duration,
                        ),
                        Colors.Green)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed(subCommand, 'Mod Log')] });
            }

            return msg.react('✅');
        }

        return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
    },
};
