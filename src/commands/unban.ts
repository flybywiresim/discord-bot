import discord, { EmbedField, Snowflake, User } from 'discord.js';
import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

type UserLike = User | Snowflake

export const unban: CommandDefinition = {
    name: 'unban',
    category: CommandCategory.MODERATION,
    executor: (msg) => {
        const splitUp = msg.content.replace(/\.unban\s+/, '').split(' ');

        if (splitUp.length < 1) {
            msg.reply('you did not provide enough arguments for this command. (<id>)');
            return Promise.resolve();
        }

        const idArg = splitUp[0];

        return msg.guild.members.unban(idArg).then((user: User | Snowflake) => {
            msg.channel.send(makeSuccessfulUnbanEmbed(user));
        }).catch((error) => {
            const guildMember = msg.guild.member(idArg);

            msg.channel.send(makeFailedUnbanEmbed(guildMember?.user ?? idArg, error));
        });
    },
};

function makeSuccessfulUnbanEmbed(user: UserLike): discord.MessageEmbed {
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

    return makeEmbed({
        title: 'User Successfully Unbanned',
        fields,
        color: 'GREEN',
    });
}

function makeFailedUnbanEmbed(user: UserLike, error: any): discord.MessageEmbed {
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
        value: error,
    });

    return makeEmbed({
        title: 'Failed to Unban User',
        fields,
        color: 'RED',
    });
}
