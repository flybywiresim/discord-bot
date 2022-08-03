import { Colors } from 'discord.js';
import { CommandDefinition } from '../../../lib/command';
import { Channels, CommandCategory } from '../../../constants';
import { getConn } from '../../../lib/db';
import { makeEmbed } from '../../../lib/embed';
import { findWallet, getBalance, noWalletEmbed } from '../../../handlers/wallet';

export const balance: CommandDefinition = {
    name: ['balance', 'bal', 'b'],
    description: 'Check wallet your balance',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        if (msg.channel.id !== Channels.BOT_COMMANDS) {
            return msg.reply(`This command can only be used in <#${Channels.BOT_COMMANDS}>`);
        }

        const conn = await getConn();

        if (!conn) {
            const noConnEmbed = makeEmbed({
                title: 'Error',
                description: 'Could not connect to database',
                color: Colors.Red,
            });
            return msg.reply({ embeds: [noConnEmbed] });
        }

        const userId = msg.author.id;
        const wallet = await findWallet(userId);

        if (!wallet) {
            return msg.reply({ embeds: [noWalletEmbed] });
        }
        const { balance, lastIssued } = await getBalance(userId);
        const balanceEmbed = makeEmbed({
            title: 'Wallet | Balance',
            description: 'Current wallet balance',
            fields: [
                {
                    name: 'Balance',
                    value: `${balance} :coin:`,
                    inline: true,
                },
                {
                    name: 'Last Issued',
                    value: lastIssued.toLocaleString(),
                    inline: true,
                },
            ],
            thumbnail: { url: msg.author.displayAvatarURL() },
        });
        return msg.reply({ embeds: [balanceEmbed] });
    },
};
