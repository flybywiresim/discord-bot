import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

enum beautifiedStatus {
    ONLINE = 'Online',
    IDLE = 'Idle',
    DND = 'Do Not Disturb',
    OFFLINE ='Offline'
}

export const whois: CommandDefinition = {
    name: 'whois',
    description: 'Provides an embedded message with information about the mentioned user',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const query = msg.content.replace(/\.whois(\s|$)+/, '').replace(/[@#!<>]+/g, '');
        const targetMember = query ? await msg.guild.members.fetch(query) : msg.member;

        const filteredRoles = targetMember.roles.cache.filter((role) => role.id !== msg.guild.id);
        const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map((role) => role.toString());

        const onlineStatus = beautifiedStatus[targetMember.presence?.status.toUpperCase()];

        let status;
        if (targetMember.presence == null) {
            status = 'Offline';
        } else {
            status = onlineStatus;
        }

        const whoisEmbed = makeEmbed({
            author: {
                name: targetMember.user.username,
                iconURL: targetMember.user.avatarURL(),
            },
            description: `${targetMember}`,
            thumbnail: { url: targetMember.user.avatarURL() },
            fields: [
                {
                    name: 'Username',
                    value: targetMember.user.tag,
                    inline: true,
                },
                {
                    name: 'Status',
                    value: status,
                    inline: true,
                },
                {
                    name: 'Joined',
                    value: moment(targetMember.joinedTimestamp).format('llll'),
                    inline: true,
                },
                {
                    name: 'Registered',
                    value: moment(targetMember.user.createdTimestamp).format('llll'),
                    inline: false,
                },
                {
                    name: 'Roles',
                    value: `\u200B${listedRoles.join(', ')}`,
                },
                {
                    name: 'Permissions',
                    value: targetMember.permissions.toArray().join(', ').toLowerCase().replace(/_/g, ' ')
                        .replace(/(^\w{1})|(\s+\w{1})/g, (char) => char.toUpperCase()),
                },
            ],
        });

        return msg.reply({ embeds: [whoisEmbed] });
    },
};
