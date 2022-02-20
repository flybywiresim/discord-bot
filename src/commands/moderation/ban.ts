import discord, { EmbedField, Snowflake, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

type UserLike = User | Snowflake

export const ban: CommandDefinition = {
    name: 'ban',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.ban\s+/, '').split(' ');

        if (splitUp.length < 2) {
            await msg.reply('you did not provide enough arguments for this command. (<id> <reason>)');
            return Promise.resolve();
        }

        const idArg = splitUp[0];
        const reason = splitUp.slice(1).join(' ');


        return msg.guild.members.ban(idArg).then((user: User | Snowflake) => {
            // A bt of a hack, but we need to propagate the reason and moderator to the event handler.
            // Since discord.js caches user objects, we can exploit that to attach more info to the ban.
            if (typeof user !== 'string') {
                (user as any).banReason = reason;
                (user as any).banModerator = msg.author;
            }
            msg.channel.send({ embeds: [makeSuccessfulBanEmbed(user, reason)] });
        }).catch(async (error) => {
            const guildMember = await msg.guild.members.fetch(idArg);

            msg.channel.send({ embeds: [makeFailedBanEmbed(guildMember?.user ?? idArg, error)] });
        });
    },
};

function makeSuccessfulBanEmbed(user: UserLike, reason: string): discord.MessageEmbed {
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
        color: 'GREEN',
    });
}

function makeFailedBanEmbed(user: UserLike, error: any): discord.MessageEmbed {
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
        value: '\u200B' + error,
    });

    return makeEmbed({
        title: 'Failed to Ban User',
        fields,
        color: 'RED',
    });
}
