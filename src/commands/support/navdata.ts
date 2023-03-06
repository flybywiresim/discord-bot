import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const navdataEmbed = makeEmbed({
    title: 'FlyByWire Support | Navdata usage',
    description: makeLines([
        'The FlyByWire A32NX uses the navdata that is available in Microsoft Flight Simulator. This navdata can come from MSFS itself, or 3rd party navdata addons like Navigraph Navdata or Aerosoft NavDataPro.',
        '',
        'When you encounter missing navdata or a mismatch while flying the FlyByWire A32NX, check the following:',
        '- If you use a 3rd party addon for navdata, make sure it is up to date using their tool.',
        '- Check if the World Map or standard A320 have the same behavior. If so, it is a general navdata issue and not an issue with the FlyByWire A32NX.',
        '',
        'More information can be found in our [Commonly Reported Issues](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/?h=nav+data#nav-data-issues).',
        '',
        'Note: This is different from some other addon planes using their own external database for navdata.',
    ]),
});

export const navdata: MessageCommandDefinition = {
    name: ['navdata'],
    description: 'Provides more information on how the FlyByWire A32NX uses the navdata available in MSFS.',
    category: CommandCategory.SUPPORT,
    genericEmbed: navdataEmbed,
};
