import moment from 'moment';
import { CommandDefinition, replyWithMsg } from '../../lib/command';
import { CommandCategory } from '../../constants';

const dateFormat = 'HH:mm (LT)';

export const zulu: CommandDefinition = {
    name: 'zulu',
    description: 'Get the current time at a given UTC-offset timezone.',
    category: CommandCategory.UTILS,
    executor: (msg) => {
        const args = msg.content.split(' ').slice(1);
        const utcOffset = args.length ? parseFloat(args.join('')) : 0;
        if (Number.isNaN(utcOffset)) return msg.reply('Please provide a valid timezone.');
        if (!(utcOffset >= -12 && utcOffset <= 14)) return msg.reply('Please provide a timezone within UTC-12 and UTC+14.');

        return replyWithMsg(msg, `It is ${moment().utc().add(utcOffset, 'hours').format(dateFormat)} in that timezone (UTC${utcOffset >= 0 ? '+' : ''}${utcOffset}).`);
    },
};
