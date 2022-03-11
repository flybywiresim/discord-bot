import { Guild, GuildMember, TextChannel, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Channels } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const unTimeoutDMEmbed = (moderator: User, guild: Guild) => makeEmbed({
    author: {
        name: guild.name,
        icon_url: guild.iconURL(),
    },
    title: `Your timeout was removed in ${guild.name}`,
    description: `Your timeout was removed in ${guild.name}. You may chat, react and join voice chats once again.`,
    footer: { iconURL: moderator.avatarURL(), text: `Timeout removed by ${moderator.tag}` },
});

export const unTimeoutEmbed = (user: User) => makeEmbed({
    title: 'Successfully Removed Timeout',
    fields: [
        {
            inline: true,
            name: 'User',
            value: user.toString(),
        },
        {
            inline: true,
            name: 'ID',
            value: user.id,
        },
    ],
    color: 'GREEN',
});

export const unTimeoutModLogEmbed = (moderator: User, user: User) => makeEmbed({
    color: 'GREEN',
    author: {
        name: `[REMOVED TIMEOUT] ${user.tag}`,
        icon_url: user.displayAvatarURL({ dynamic: true }),
    },
    fields: [
        {
            name: 'Member',
            value: user.toString(),
        },
        {
            name: 'Moderator',
            value: `<@${moderator}>`,
        },
    ],
    timestamp: Date.now(),
    footer: { text: `User ID: ${user.id}` },
});

const failedUnTimeoutEmbed = (user: User) => (makeEmbed({
    title: 'Failed to remove timeout from user',
    fields: [
        {
            inline: true,
            name: 'User',
            value: user.toString(),
        },
        {
            inline: true,
            name: 'ID',
            value: user.id,
        },
    ],
    color: 'RED',
})
);

export const untimeout: CommandDefinition = {
    name: ['untimeout', 'removetimeout'],
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const args = msg.content.replace(/\.untimeout\s+/, '').split(' ');
        if (args.length < 1) {
            await msg.reply('You need to provide the following arguments for this command: <id>');
            return;
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const id = args[0];
        const targetUser: GuildMember = await msg.guild.members.fetch(id);

        targetUser.timeout(0).then(async () => {
            if (targetUser.isCommunicationDisabled() === false) {
                const timeoutResponse = await msg.channel.send({ embeds: [unTimeoutEmbed(targetUser.user)] });
                await targetUser.send({ embeds: [unTimeoutDMEmbed(msg.author, msg.guild)] });
                await modLogsChannel.send({ embeds: [unTimeoutModLogEmbed(msg.author, targetUser.user)] });
                return setTimeout(() => {
                    timeoutResponse.delete();
                    msg.delete();
                }, 4000);
            }
            return msg.channel.send({ embeds: [failedUnTimeoutEmbed(targetUser.user)] });
        });
    },
};
