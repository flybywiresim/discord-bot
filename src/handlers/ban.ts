import { Guild, TextChannel, User } from 'discord.js';
import { EventHandlerDefinition } from '../lib/handler';
import { Channels } from '../constants';
import { makeEmbed } from '../lib/embed';

const FEATURE_NOT_AVAIL = '(not available for non-bot bans)';

type BotBanUser = User & { banReason?: string, banModerator?: User }

export const userBanned: EventHandlerDefinition<[Guild, BotBanUser]> = {
    event: 'guildBanAdd',
    executor: async (guild, user) => {
        // Since we do some big chungus cache trickery in commands/ban.ts, we wait a bit before processing this.
        // This makes sure that the post-ban promise success handler has time to edit the cached user.
        setTimeout(async () => {
            const modLogsChannel = guild.channels.resolve(Channels.MOD_LOGS) as TextChannel;

            const banLogEmbed = makeEmbed({
                color: 'RED',
                author: {
                    name: `[BANNED] ${user.tag}`,
                    icon_url: user.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    { name: 'Member', value: user.tag, inline: true },
                    { name: 'Moderator', value: `\`${user.banModerator ?? FEATURE_NOT_AVAIL}\``, inline: true },
                    { name: 'Reason', value: `\`${user.banReason ?? FEATURE_NOT_AVAIL}\``, inline: false },
                ],
                footer: { text: `User ID: ${user.id}` },
            });

            await modLogsChannel.send({embeds: [banLogEmbed]});

        }, 1_000);
    },
};
