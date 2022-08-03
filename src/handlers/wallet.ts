import { Colors } from 'discord.js';
import Wallet from '../lib/schemas/walletSchema';
import Logger from '../lib/logger';
import { makeEmbed, makeLines } from '../lib/embed';

export const noWalletEmbed = makeEmbed({
    title: 'Wallet | Not found',
    description: makeLines([
        'Wallet not found/doesn\'t exist.',
        'To create one please use the command:',
        '```.createwallet```',
        '```.create```',
        '```.cw```',
        'This allows you to play mini-games that require tokens',
    ]),
    color: Colors.Red,
});

export const createNewWallet = async (userId: string) => {
    try {
        const wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            const newWallet = new Wallet({
                userId,
                balance: 5,
                lastIssued: new Date(),
                lastUpdated: new Date(),
            });

            await newWallet.save();
            return newWallet;
        }
        return Promise.resolve();
    } catch (err) {
        Logger.error(err);
        throw new Error(err);
    }
};
export const findWallet = async (userId: string) => {
    try {
        const wallet = await Wallet.findOne({ userId });
        return Promise.resolve(wallet);
    } catch (err) {
        Logger.error(err);
        throw new Error(err);
    }
};

export const addBalance = async (userId: string, amount: number) => {
    try {
        const wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        wallet.balance += amount;
        wallet.lastIssued = new Date();
        wallet.lastUpdated = new Date();
        await wallet.save();
        return wallet;
    } catch (err) {
        Logger.error(err);
        throw new Error(err);
    }
};

export const getBalance = async (userId: string) => {
    try {
        const wallet = await findWallet(userId);
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        const { balance, lastIssued } = wallet;
        return { balance, lastIssued };
    } catch (err) {
        Logger.error(err);
        throw new Error(err);
    }
};
