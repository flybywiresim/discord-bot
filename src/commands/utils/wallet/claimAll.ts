import { Colors, EmbedField } from 'discord.js';
import { CommandDefinition } from '../../../lib/command';
import { Channels, CommandCategory } from '../../../constants';
import { addBalance, findWallet, noWalletEmbed } from '../../../handlers/wallet';
import { makeEmbed } from '../../../lib/embed';
import { getConn } from '../../../lib/db';

export const claimAll: CommandDefinition = {
    name: ['claimall', 'claim', 'ca'],
    description: 'claims all of your coins',
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

        const fields: EmbedField[] = [];

        // If more than 1 hour give 5 coins
        const { balance, lastIssued } = wallet;
        const now = new Date();
        const diff = now.getTime() - lastIssued.getTime();
        const diffHours = Math.ceil(diff / (1000 * 60 * 60));
        const hourlyReward = 5;

        if (diffHours > 1) {
            const newBalance = await addBalance(userId, hourlyReward);
            const {
                balance,
                lastIssued,
            } = newBalance;

            fields.push({
                name: 'Balance',
                value: `${balance} :coin:`,
                inline: true,
            });

            fields.push({
                name: 'Last Issued',
                value: lastIssued.toLocaleString(),
                inline: true,
            });

            fields.push({
                name: 'Hourly Reward',
                value: `**+${hourlyReward}** :coin:`,
                inline: false,
            });

            const rewardEmbed = makeEmbed({
                title: 'Wallet | Claim All',
                fields,
                thumbnail: { url: msg.author.displayAvatarURL() },
            });

            return msg.reply({ embeds: [rewardEmbed] });
        }

        const noRewardEmbed = makeEmbed({
            title: 'Wallet | Claim All',
            description: 'You have claimed your hourly reward.',
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
            color: Colors.Red,
        });
        return msg.reply({ embeds: [noRewardEmbed] });
    },
};
