import moment from 'moment';
import { CommandDefinition } from '../lib/command';
import { CommandCategory } from '../constants';
import { makeEmbed } from '../lib/embed';

enum beautifiedStatus {
    online = "Online",
    idle = "Idle",
    dnd = "Do Not Disturb",
    offline ="Offline"
}

export const whois: CommandDefinition = {
    name: 'whois',
    description: 'Provides an embedded message with information about the mentioned user',
    category: CommandCategory.PUBLIC,
    executor: (msg) => msg.channel.send(makeEmbed({
        author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL(),
        },
        description: `<@!${msg.author.id}>`,
        thumbnail: {
            url: msg.author.avatarURL()
        },
        fields: [
            {
                name: "Username",
                value: msg.author.tag,
                inline: true
            },
            {
                name: "Status",
                value: beautifiedStatus[msg.author.presence.status],
                inline: true
            },
            {
                name: "Joined",
                value: moment(msg.member.joinedTimestamp).format("llll"),
                inline: true
            },
            {
                name: "Registered",
                value: moment(msg.author.createdTimestamp).format("llll"),
                inline: false
            },
            {
                name: "Roles",
                value: `<@&${msg.member.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).keyArray().filter(x => x != msg.guild.id).join("> <@&")}>`
            },
            {
                name: "Permissions",
                value: msg.member.permissions.toArray().join(", ").toLowerCase().replace(/_/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, char => char.toUpperCase())
            }
        ]
    }))
};
