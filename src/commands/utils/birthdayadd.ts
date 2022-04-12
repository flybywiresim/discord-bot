import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';
import { database } from '../../handlers/mysqldb'
import moment from 'moment';

export const birthday: CommandDefinition = {
    name: 'birthday add',
    description: 'Initiates the birthday command to add a birthday',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {


            setTimeout(async () => {
                await database.utils.dbcheck(database.connect);
                await database.utils.init(database.connect, 'MM-DD', '832721829822857296', ['879012702222168064'], 'HAPPY BIRTHDAY', 'Happy BDay Lol', '#ffffff');
            }, 3000)
            
            const addEmbed = makeEmbed({
                title: 'Birthday Added!',
                description: 'Birthday Successfully Added!',
            });

            const errorEmbed = makeEmbed({
                title: 'Uh oh',
                description: 'Failed to add Birthday',
            });
        
            
                if(msg) {
                    await msg.channel.send({ embeds: [addEmbed] }),

                } else {

                    await msg.channel.send({ embeds: [errorEmbed] });
                }
            }
         }
     

    