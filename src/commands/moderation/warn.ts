import { TextChannel } from 'discord.js';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';



export const warn: CommandDefinition = {
    name: 'warn',
    requiredPermissions: ['BAN_MEMBERS'],
    description: 'DMs a user with a warning message sent by a moderator',
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const splitUp = msg.content.replace(/\.warn\s+/, '').split(' ');
        if (splitUp.length < 2) {
            await msg.reply('you did not provide enough arguments for this command. (<id> <warning>)');
            return Promise.resolve();
        }
        const moderator = msg.author.tag;
        const user = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(splitUp[0]);
        // const username = msg.mentions.users.first().tag;
        const warning = splitUp.slice(1).join(' ');
        // create embeds (one for mod-logs, one for user dms and one for the text channel the user was warned in.
        const dmEmbed = makeEmbed({
            title: 'You have been warned in FlyByWire Simulations',
            description: `Reason: ${warning}`,
        });
        const channelEmbed = makeEmbed({
            title: `${user} was warned`,
            description: `Reason: ${warning}`,
        });
        const modEmbed = makeEmbed({
            title: `${moderator} warned ${user}`,
            description: `Reason: ${warning}`,
        });
        // dm the user
        await user.send(dmEmbed);
        // send embed in channel the user was warned in
        await msg.channel.send(channelEmbed);
        // get the mod-logs channel and send embed
        const logChannel: TextChannel = msg.guild.channels.cache.get('910670246476644412') as TextChannel;
        await logChannel.send(modEmbed);
    },
};
