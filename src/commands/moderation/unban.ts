import { Colors, EmbedBuilder, EmbedField, GuildMember, Snowflake, User } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory, RoleGroups } from '../../constants';
import { makeEmbed } from '../../lib/embed';

type UserLike = User | Snowflake

export const unban: CommandDefinition = {
    name: 'unban',
    requirements: { roles: RoleGroups.STAFF },
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.unban\s+/, '').split(' ');

        if (splitUp.length < 1) {
            await msg.reply('you did not provide enough arguments for this command. (<id>)');
            return Promise.resolve();
        }

        const idArg = splitUp[0];
        try {
            const user = await msg.guild.members.unban(idArg);
            return msg.reply({ embeds: [makeSuccessfulUnbanEmbed(!(user instanceof GuildMember) ? user : idArg)] });
        } catch {
            return msg.reply({ embeds: [makeFailedUnbanEmbed(idArg, 'The user is either not banned, or an unknown user.')] });
        }
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
