import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const timeout: CommandDefinition = {
    name: 'timeout',
    requiredPermissions: ['BAN_MEMBERS'],
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        const args = msg.content.replace(/\.timeout\s+/, '').split(' ');
        if (args.length < 3) {
            await msg.reply('You need to provide the following arguments for this command: <id> <timeoutLength> <reason>');
            return;
        }

        const id = args[0];
        const user = await msg.guild.members.fetch(id);
        const timeoutLength = parseInt(args[1]);
        const reason = args[2];

        await user.timeout(timeoutLength * 60 * 1000, reason);
        await msg.channel.send(
            {
                embeds: [makeEmbed({
                    title: 'User Successfully Timed Out',
                    fields: [
                        {
                            inline: true,
                            name: 'User',
                            value: user.toString(),
                        },
                        {
                            inline: true,
                            name: 'ID',
                            value: id,
                        },
                        {
                            inline: false,
                            name: 'Reason',
                            value: reason,
                        },
                    ],
                    color: 'GREEN',
                })],
            },
        );
    },
};
