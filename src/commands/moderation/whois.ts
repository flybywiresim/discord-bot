import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

enum beautifiedStatus {
    ONLINE = "Online",
    IDLE = "Idle",
    DND = "Do Not Disturb",
    OFFLINE ="Offline"
}

export const whois: CommandDefinition = {
    name: 'whois',
    description: 'Provides an embedded message with information about the mentioned user',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        let query = msg.content.replace(/\.whois(\s|$)+/, '').replace(/[@#!<>]+/g, '');
        let targetMember = query ? await msg.guild.members.fetch(query) : msg.member;

        const whoisEmbed = makeEmbed({
            author: {
                name: targetMember.user.username,
                icon_url: targetMember.user.avatarURL(),
            },
            description: `<@!${targetMember.id}>`,
            thumbnail: {
                url: targetMember.user.avatarURL()
            },
            fields: [
                {
                    name: "Username",
                    value: targetMember.user.tag,
                    inline: true
                },
                {
                    name: "Status",
                    value: beautifiedStatus[targetMember.presence.status.toUpperCase()],
                    inline: true
                },
                {
                    name: "Joined",
                    value: moment(targetMember.joinedTimestamp).format("llll"),
                    inline: true
                },
                {
                    name: "Registered",
                    value: moment(targetMember.user.createdTimestamp).format("llll"),
                    inline: false
                },
                {
                    name: "Roles",
                    value: `<@&${targetMember.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).keyArray().filter(x => x != msg.guild.id).join("> <@&")}>`
                },
                {
                    name: "Permissions",
                    value: targetMember.permissions.toArray().join(", ").toLowerCase().replace(/_/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, char => char.toUpperCase())
                }
            ]
        });

        return msg.channel.send({ embeds: [whoisEmbed] });
    }
};
