import { DMChannel, TextChannel } from 'discord.js';
import { makeEmbed } from '../lib/embed';
import Logger from '../lib/logger';

module.exports = {
    event: 'messageCreate',
    executor: async (msg) => {
        if (msg.guild === null) {
            // DMs
            return;
        }

        const scamLogs = msg.guild.channels.cache.find(channel => channel.id === '931928312303976488');

        if (msg.content.toLowerCase().includes('@everyone') && msg.author.bot === false && !(msg.channel instanceof DMChannel)) {
            const excludedRoles = [
                'Admin Team',
                'Moderation Team',
                'Development Team',
                'Media Team',
                'Community Support',
                'FBW Emeritus',
            ];
            let hasRole = false;
            excludedRoles.forEach((findrole) => {
                if (msg.member.roles.cache.some((role) => role.name === findrole)) {
                    hasRole = true
                }
            });
            // @ts-ignore
            if (hasRole === true) {

                const allowedEmbed = makeEmbed({
                    title: 'Potential Scam Alert',
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/932350968522240101/932625886275043338/Approved.png' },
                    description: 'An allowed role has used @everyone',
                    author: {
                        name: msg.author.tag,
                        icon_url: msg.author.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        {
                            name: 'User:',
                            value: `<@${msg.author.id}>`,
                        },
                        {   name: 'Channel:',
                            value: `<#${msg.channel.id}>`,
                        },
                        {
                            name: 'Message Content:',
                            value: msg.content.toString(),
                        }
                    ],
                });

                await (scamLogs as TextChannel).send({ embeds: [allowedEmbed] });

            } else {
                const mutedRole = msg.guild.roles.cache.find((role) => role.name === 'Muted');

                await msg.delete();
                try {
                    await msg.author.send('We have detected use of @everyone in one of our text channels. This function is in place to prevent discord scams and has resulted in an automatic mute and notification of our moderation team. If this was done in error, our moderation team will reverse the mute, however please refrain from using the @everyone ping in future.');
                } catch (e) {
                    Logger.error(e);

                    const noDMEmbed = makeEmbed({
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.author.displayAvatarURL({ dynamic: true }),
                        },
                        description: ' DM was not sent to ' + `<@${  msg.author.id  }>` + '.',
                    });

                    await (msg.guild.channels.cache.find((channel) => channel.id === '931928312303976488') as TextChannel).send({ embeds: [noDMEmbed] });
                }

                const notAllowedEmbed = makeEmbed({
                    title: 'Potential Scam Alert',
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/932350968522240101/932625893657026630/Scam.png' },
                    author: {
                        name: msg.author.tag,
                        icon_url: msg.author.displayAvatarURL({ dynamic: true }),
                    },
                    fields: [
                        {
                            name: 'User:',
                            value: `<@${  msg.author.id  }>`,
                        },
                        {   name: 'Channel:',
                            value: `<#${msg.channel.id}>`,
                        },
                        {
                            name: 'Message Content:',
                            value: msg.content.toString(),
                        }
                    ],
                });

                await (msg.guild.channels.cache.find((channel) => channel.id === '931928312303976488') as TextChannel).send({ embeds: [notAllowedEmbed] });
                await msg.member.roles.add(mutedRole);
            }
        }
    }

}
