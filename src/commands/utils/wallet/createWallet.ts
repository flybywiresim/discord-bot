import { Colors } from 'discord.js';
import { CommandDefinition } from '../../../lib/command';
import { Channels, CommandCategory } from '../../../constants';
import { createNewWallet, findWallet } from '../../../handlers/wallet';
import { makeEmbed, makeLines } from '../../../lib/embed';
import { getConn } from '../../../lib/db';

export const createWallet: CommandDefinition = {
    name: ['createwallet', 'create', 'cw'],
    description: 'Creates a virtual wallet for you to play mini-games with',
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
        const user = msg.guild.members.resolve(userId);

        if (!wallet) {
            await createNewWallet(userId);

            const findCreatedWallet = await findWallet(userId);
            const { balance, lastIssued } = findCreatedWallet;

            const newWalletEmbed = makeEmbed({
                title: 'Wallet | Created',
                description: makeLines([
                    `A wallet was created for ${user}`,
                    'You can now play mini-games that require tokens',
                ]),
                fields: [
                    {
                        name: 'Username',
                        value: msg.author.username,
                        inline: true,
                    },
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

            return msg.reply({ embeds: [newWalletEmbed] });
        }
        const { balance, lastIssued } = wallet;
        const walletExistsEmbed = makeEmbed({
            title: 'Wallet | Already Exists',
            description: makeLines([
                `A wallet for ${user} already exists`,
                'You can now play mini-games that require tokens',
            ]),
            fields: [
                {
                    name: 'Username',
                    value: msg.author.username,
                    inline: true,
                },
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

        return msg.reply({ embeds: [walletExistsEmbed] });
    },
};
