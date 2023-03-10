import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const simbridgeLogEmbed = makeEmbed({
    title: 'FlyByWire Support | SimBridge Log',
    description: makeLines([
        'Please send us your SimBridge Log for further investigation.',
        '',
        'You will find your log file here: `<YOUR_COMMUNITY_FOLDER>\\flybywire-externaltools-simbridge\\resources\\logs`, the title will include the date of the log.',
        '',
        'More information can be found [here.](https://docs.flybywiresim.com/simbridge/troubleshooting/#logfile)',
    ]),
});

export const simbridgeLog: MessageCommandDefinition = {
    name: ['simbridgelog', 'slog'],
    description: 'Information on how to provide SimBridge Log',
    category: CommandCategory.SUPPORT,
    genericEmbed: simbridgeLogEmbed,
};
