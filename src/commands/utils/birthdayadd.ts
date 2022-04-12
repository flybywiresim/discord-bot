import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import discord from 'discord.js';
import mysql from 'mysql';


export const birthday: CommandDefinition = {
    name: 'birthday add',
    description: 'Initiates the birthday command to add a birthday',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        const client = new discord.Client({
            intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 
                'DIRECT_MESSAGES', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_INTEGRATIONS', 
                'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES',
                'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'],
            partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
            allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
        });

        client.on('ready', () => {
            let con = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'birthday'
            });
        
            client.utils = require('discord-birthdays')

            console.log('bot is ready')
        
            setTimeout(async () => {
                await client.utils.dbcheck(con)
                await client.utils.init(con, client, 'MM-DD', '832721829822857296', ['879012702222168064'], 'HAPPY BIRTHDAY', 'Happy BDay Lol', '#ffffff')
            }, 3000)
        });

        client.on('messageCreate', (msg) => {
         
            
                const args = msg.content.slice(prefix.length).trim().split(/ +/g);
                let command = args.shift().toLowerCase();
                const addEmbed = makeEmbed({
                    title: 'Birthday Added!',
                    description: 'Birthday Successfully Added!',
                });

                const errorEmbed = makeEmbed({
                    title: 'Uh oh',
                    description: 'Failed to add Birthday',
                });
            
                    if (command === 'add') {
                    const check = client.utils.addbday(con, msg.author.id, args[0])

                    if(check) {
                        await msg.channel.send({ embeds: [addEmbed] }),

                    } else {

                        await msg.channel.send({ embeds: [errorEmbed] });
                    }
                }
                }
    
        
       client.login(process.env.BOT_SECRET)
