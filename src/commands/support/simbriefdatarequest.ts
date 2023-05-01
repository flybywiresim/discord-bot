import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const simbriefdatarequestEmbed = makeEmbed({
    title: 'FlyByWire Support | SimBrief Data Request',
    description: makeLines([
        'To evaluate your problem we kindly ask you to enter the following bot command into a new message.',
        '```.simbriefdata <userId>```',
        'Replace <userId> incl. the brackets with your simbrief userId or userName. The Bot will read your last generated flight plan and display some details about it incl. the route.',
        '',
        '**Privacy notice**: If you share your userId or username it is possible to read your pilot name from the API the bot uses. This pilot name is by default your real name, but you can change it in the flight edit screen or your user profile in SimBrief. No data is stored by FlyByWire when using the command.',
    ]),
});

export const simbriefdatarequest: MessageCommandDefinition = {
    name: 'simbriefdatarequest',
    description: 'Requests the use of the simbriefdata command or the simbrief userid with a risk disclaimer',
    category: CommandCategory.SUPPORT,
    genericEmbed: simbriefdatarequestEmbed,
};
