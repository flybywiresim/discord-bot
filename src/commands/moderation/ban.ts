import { Colors, EmbedBuilder, EmbedField, Snowflake, TextChannel, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { Channels, CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

type UserLike = User | Snowflake

export const ban: CommandDefinition = {
    name: 'ban',
    requiredPermissions: ['BanMembers'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.ban\s+/, '').split(' ');

        if (splitUp.length < 2) {
            await msg.reply('you did not provide enough arguments for this command. (<id> <reason>)');
            return Promise.resolve();
        }

        const idArg = splitUp[0];
        const reason = splitUp.slice(1).join(' ');

        const modLogsChannel = msg.guild.channels.resolve(Channels.MOD_LOGS) as TextChannel | null;

        return msg.guild.members.ban(idArg).then((user: User | Snowflake) => {
            if (modLogsChannel && typeof user !== 'string') {
                const modLogEmbed = makeEmbed({
                    color: Colors.Red,
                    author: {
                        name: `[BANNED] ${user.tag}`,
                        iconURL: user.displayAvatarURL(),
                    },
                    fields: [
                        {
                            name: 'Member',
                            value: user.toString(),
                        },
                        {
                            name: 'Moderator',
                            value: `${msg.author}`,
                        },
                        {
                            name: 'Reason',
                            value: `\u200B${reason}`,
                        },
                    ],
                    footer: { text: ` User ID: ${(user instanceof User) ? user.id : user}` },
                });

                modLogsChannel.send({ embeds: [modLogEmbed] });
            }

            msg.channel.send({ embeds: [makeSuccessfulBanEmbed(user, reason)] });
        }).catch(async (error) => {
            const guildMember = await msg.guild.members.fetch(idArg);

            msg.channel.send({ embeds: [makeFailedBanEmbed(guildMember?.user ?? idArg, error)] });
        });
    },
};

function makeSuccessfulBanEmbed(user: UserLike, reason: string): EmbedBuilder {
    const fields: EmbedField[] = [];

    if (user instanceof User) {
        fields.push({
            inline: true,
            name: 'Username',
            value: user.toString(),
        });
    }

    fields.push({
        inline: true,
        name: 'ID',
        value: (user instanceof User) ? user.id : user,
    });

    fields.push({
        inline: false,
        name: 'Reason',
        value: reason,
    });

    return makeEmbed({
        title: 'User Successfully Banned',
        fields,
        color: Colors.Green,
    });
}

function makeFailedBanEmbed(user: UserLike, error: any): EmbedBuilder {
    const fields: EmbedField[] = [];

    if (user instanceof User) {
        fields.push({
            inline: true,
            name: 'Username',
            value: user.toString(),
        });
    }

    fields.push({
        inline: true,
        name: 'ID',
        value: (user instanceof User) ? user.id : user,
    });

    fields.push({
        inline: false,
        name: 'Error',
        value: `\u200B${error}`,
    });

    return makeEmbed({
        title: 'Failed to Ban User',
        fields,
        color: Colors.Red,
    });
}
