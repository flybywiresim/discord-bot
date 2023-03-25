import { Colors, EmbedField, TextChannel, ChannelType } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory, RoleGroups } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { getScheduler } from '../../lib/scheduler';
import { client } from '../..';

enum TimeConversions {
    SECONDS_TO_MILLISECONDS = 1000,
    MINUTES_TO_MILLISECONDS = 60 * 1000,
    HOURS_TO_MILLISECONDS = 60 * 60 * 1000,
    DAYS_TO_MILLISECONDS = 60 * 60 * 24 * 1000,
}

const helpEmbed = (evokedCommand: String) => makeEmbed({
    title: 'Manage Slow Mode - Help',
    description: 'A command to set and manage slow mode for channels.',
    fields: [
        {
            name: 'Channel ID parameter',
            value: 'If you do not provide a Channel ID, the command applies to the channel in which it is executed.',
            inline: false,
        },
        {
            name: 'Disable Timer parameter',
            value: 'The disable timer needs to be provided with an indication like s, m, h or d. Which respectively stand for seconds, minutes, hours or days.',
            inline: false,
        },
        {
            name: `Setting slow mode: \`${evokedCommand} set [channel id] <slow mode seconds> [disable timer]\``,
            value: 'Sets slow mode for a channel in seconds. Can optionally schedule disabling slow mode. The maximum value of slow mode seconds is 21600 (6h).',
            inline: false,
        },
        {
            name: `Disable slow mode: \`${evokedCommand} disable [channel id]\``,
            value: 'Disables slow mode on channel. Automatically removes any scheduled removal.',
            inline: false,
        },
    ],
});

const failedEmbed = (action: string, channel: string) => makeEmbed({
    title: `Slow Mode - ${action} failed`,
    description: `Failed to ${action} the slow mode for channel <#${channel}>.`,
    color: Colors.Red,
});

const modLogEmbed = (action: string, fields: any, color: number) => makeEmbed({
    title: `Slow Mode - ${action}`,
    fields,
    color,
});

const missingInfoEmbed = (action: string, information: string) => makeEmbed({
    title: `Slow Mode - ${action} - missing information`,
    description: `${information}`,
    color: Colors.Red,
});

const missingChannelEmbed = (channel: string) => makeEmbed({
    title: 'Slow Mode - Channel does not exist',
    description: `The Channel ID ${channel} does not refer to an existing Text or Forum channel, or a Thread. Please provide a valid channel.`,
    color: Colors.Red,
});

const noChannelEmbed = (action:string, channelName: string) => makeEmbed({
    title: `Slow Mode - ${action} - No ${channelName} channel`,
    description: `The command was successful, but no message to ${channelName} was sent. Please check the channel still exists.`,
    color: Colors.Yellow,
});

const noSchedulerEmbed = makeEmbed({
    title: 'Slow Mode - No scheduler',
    description: 'Could not find an active scheduler. No automatic disable can be scheduled.',
    color: Colors.Red,
});

const slowModeEmbedField = (moderator: string, channel: string, slowmode: string, timeout: string): EmbedField[] => [
    {
        inline: true,
        name: 'Channel',
        value: `<#${channel}>`,
    },
    {
        inline: true,
        name: 'Slow mode limit',
        value: slowmode,
    },
    {
        inline: true,
        name: 'Auto disable timeout',
        value: timeout,
    },
    {
        inline: true,
        name: 'Moderator',
        value: moderator,
    },
];

export const slowMode: CommandDefinition = {
    name: ['slowmode'],
    description: 'Manages slow mode for channels and potentially disable slow mode after a certain time.',
    category: CommandCategory.MODERATION,
    requirements: { roles: RoleGroups.STAFF },
    executor: async (msg) => {
        const subCommands = ['set', 'disable'];
        const scheduler = getScheduler();
        if (!scheduler) {
            await msg.reply({ embeds: [noSchedulerEmbed] });
        }

        const modLogsChannel = client.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const { author } = msg;
        const [evokedCommand] = msg.content.trim().split(/\s+/);
        const args = msg.content.replace(evokedCommand, '').trim();
        if (!args || args === 'help') {
            return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
        }

        let [subCommand] = args.split(/\s+/);
        let subArgs = args.replace(subCommand, '').trim();
        if (!subCommands.includes(subCommand)) {
            subCommand = 'set';
            subArgs = args;
        }

        let { channelId } = msg;
        const regexCheck = /^(?:(?<channelId>[\d]{6,}))\s*.*$/s;
        const regexMatches = subArgs.match(regexCheck);
        if (regexMatches && regexMatches.groups.channelId) {
            ({ channelId } = regexMatches.groups);
            subArgs = subArgs.replace(channelId, '').trim();
        }
        const slowmodeChannel = msg.guild.channels.resolve(channelId);
        if (!slowmodeChannel || [ChannelType.GuildText, ChannelType.GuildForum, ChannelType.PublicThread, ChannelType.PrivateThread].indexOf(slowmodeChannel.type) === -1) {
            return msg.reply({ embeds: [missingChannelEmbed(channelId)] });
        }

        if (subCommand === 'set') {
            const regexCheck = /^(?<rateLimit>[\d]+)(?:\s+(?<timeout>[\d]+[s|m|h|d]))?\s*$/s;
            const regexMatches = subArgs.toLowerCase().match(regexCheck);
            if (regexMatches === null || !regexMatches.groups.rateLimit) {
                return msg.reply({ embeds: [missingInfoEmbed('Set', `You need to provide the expected format to set the slow mode for a channel. Check \`${evokedCommand} help\` for more details.`)] });
            }

            const { rateLimit, timeout } = regexMatches.groups;
            if (parseInt(rateLimit) > 21600) {
                return msg.reply({ embeds: [missingInfoEmbed('Set', `The slow mode setting can not be over 21600 seconds (6h). Check \`${evokedCommand} help\` for more details.`)] });
            }

            try {
                if (slowmodeChannel.type === ChannelType.GuildForum || slowmodeChannel.type === ChannelType.GuildText || slowmodeChannel.type === ChannelType.PrivateThread || slowmodeChannel.type === ChannelType.PublicThread) {
                    await slowmodeChannel.setRateLimitPerUser(parseInt(rateLimit), 'Slow mode enabled through bot');
                    if (scheduler) {
                        await scheduler.cancel({ name: 'autoDisableSlowMode', data: { channelId } });
                        if (timeout) {
                            let timeoutMillis: number;
                            switch (timeout[timeout.length - 1].toLowerCase()) {
                            default: {
                                // defaults to minutes; 'm' will also run this block
                                timeoutMillis = parseInt(timeout.replace('s', '')) * TimeConversions.SECONDS_TO_MILLISECONDS;
                                break;
                            }
                            case 'm': {
                                timeoutMillis = parseInt(timeout.replace('m', '')) * TimeConversions.MINUTES_TO_MILLISECONDS;
                                break;
                            }
                            case 'h': {
                                timeoutMillis = parseInt(timeout.replace('h', '')) * TimeConversions.HOURS_TO_MILLISECONDS;
                                break;
                            }
                            case 'd': {
                                timeoutMillis = parseInt(timeout.replace('d', '')) * TimeConversions.DAYS_TO_MILLISECONDS;
                                break;
                            }
                            }
                            const executionDate: Date = new Date(Date.now() + timeoutMillis);
                            await scheduler.schedule(executionDate, 'autoDisableSlowMode', { channelId });
                        }
                    }
                }
            } catch {
                return msg.reply({ embeds: [failedEmbed('Set', channelId)] });
            }

            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed('Set',
                        slowModeEmbedField(
                            author.toString(),
                            channelId,
                            `${rateLimit}s`,
                            timeout && scheduler ? timeout : 'None',
                        ),
                        Colors.Green)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed('Set', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        if (subCommand === 'disable') {
            try {
                if (slowmodeChannel.type === ChannelType.GuildForum || slowmodeChannel.type === ChannelType.GuildText || slowmodeChannel.type === ChannelType.PrivateThread || slowmodeChannel.type === ChannelType.PublicThread) {
                    await slowmodeChannel.setRateLimitPerUser(0, 'Slow mode disabled through bot');
                    if (scheduler) {
                        await scheduler.cancel({ name: 'autoDisableSlowMode', data: { channelId } });
                    }
                }
            } catch {
                return msg.reply({ embeds: [failedEmbed('Disable', channelId)] });
            }

            try {
                await modLogsChannel.send({
                    embeds: [modLogEmbed('Disable',
                        slowModeEmbedField(
                            author.toString(),
                            channelId,
                            'Disabled',
                            'None',
                        ),
                        Colors.Green)],
                });
            } catch {
                msg.reply({ embeds: [noChannelEmbed('Disable', 'Mod Log')] });
            }

            return msg.react('✅');
        }

        return msg.reply({ embeds: [helpEmbed(evokedCommand)] });
    },
};
