import { Colors, EmbedBuilder, EmbedField, Snowflake, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

type UserLike = User | Snowflake

export const unban: CommandDefinition = {
    name: 'unban',
    requirements: {
        permissions: ['BanMembers']
    },
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.unban\s+/, '').split(' ');

        if (splitUp.length < 1) {
            await msg.reply('you did not provide enough arguments for this command. (<id>)');
            return Promise.resolve();
        }

        const idArg = splitUp[0];

        return msg.guild.members.unban(idArg).then((user: User | Snowflake) => {
            msg.channel.send({ embeds: [makeSuccessfulUnbanEmbed(user)] });
        }).catch(async (error) => {
            const guildMember = await msg.guild.members.fetch(idArg);

            msg.channel.send({ embeds: [makeFailedUnbanEmbed(guildMember?.user ?? idArg, error)] });
        });
    },
};

function makeSuccessfulUnbanEmbed(user: UserLike): EmbedBuilder {
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
        color: Colors.Green,
    });
}

function makeFailedUnbanEmbed(user: UserLike, error: any): EmbedBuilder {
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
        color: Colors.Red,
    });
}
