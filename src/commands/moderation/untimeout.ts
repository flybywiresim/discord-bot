import { Colors, Guild, GuildMember, TextChannel, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, Channels, RoleGroups } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import Logger from '../../lib/logger';

export const unTimeoutDMEmbed = (moderator: User, guild: Guild) => makeEmbed({
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
    color: Colors.Green,
});

export const unTimeoutModLogEmbed = (moderator: User, user: User) => makeEmbed({
    color: Colors.Green,
    author: {
        name: `[REMOVED TIMEOUT] ${user.tag}`,
        iconURL: user.displayAvatarURL(),
    },
    fields: [
        {
            name: 'Member',
            value: user.toString(),
        },
        {
            name: 'Moderator',
            value: `${moderator}`,
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
    color: Colors.Red,
})
);

export const untimeout: CommandDefinition = {
    name: ['untimeout', 'removetimeout'],
    requirements: { roles: RoleGroups.STAFF },
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const args = msg.content.replace(/(?:\.untimeout|\.removetimeout)\s+/, '').split(' ');

        if (args.length < 1 && parseInt(args[1]) !== 0) {
            await msg.reply('You need to provide the following arguments for this command: <id>');
            return;
        }

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;
        const id = args[0];
        const targetUser: GuildMember = await msg.guild.members.fetch(id);

        targetUser.timeout(1).then(async () => {
            if (targetUser.isCommunicationDisabled() === false) {
                const timeoutResponse = await msg.reply({ embeds: [unTimeoutEmbed(targetUser.user)] });
                try {
                    await targetUser.send({ embeds: [unTimeoutDMEmbed(msg.author, msg.guild)] });
                } catch (e) {
                    Logger.error(e);
                    if (modLogsChannel) {
                        await modLogsChannel.send({
                            embeds: [
                                makeEmbed({
                                    author: {
                                        name: msg.author.tag,
                                        iconURL: msg.author.displayAvatarURL(),
                                    },
                                    title: 'Error while sending DM',
                                    color: Colors.Red,
                                    description: `DM was not sent to ${targetUser.toString()} for their timeout removal.`,
                                }),
                            ],
                        });
                    }
                }
                if (modLogsChannel) {
                    await modLogsChannel.send({ embeds: [unTimeoutModLogEmbed(msg.author, targetUser.user)] });
                }
                return setTimeout(() => {
                    timeoutResponse.delete();
                    msg.delete();
                }, 4000);
            }
            return msg.reply({ embeds: [failedUnTimeoutEmbed(targetUser.user)] });
        });
    },
};
