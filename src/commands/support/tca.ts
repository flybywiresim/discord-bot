import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory, imageBaseUrl } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const TCA_URL = `${imageBaseUrl}/support/tca-settings.png`;

const tcaEmbed = makeEmbed({
    title: 'FlyByWire Support | TCA Throttle',
    description: makeLines([
        'The Thrustmaster TCA Quadrant Airbus Edition is a popular hardware throttle for flying the FlyByWire A32NX. The Quadrant can be bought and used with or without the add-ons which include axis and buttons for flaps, spoilers, gear, and more.',
        'The default controller settings in MSFS always includes the key bindings for the add-on axis and buttons, which can cause problems if the add-ons are not connected, e.g., automatically deploying full flaps, especially after pausing the sim.',
        '',
        'Make sure to remove any key bindings for hardware not connected.',
        '',
        'More information can be found on our [Common Hardware Controllers and Setup page](https://docs.flybywiresim.com/fbw-a32nx/a32nx-api/hardware/?h=#thrustmaster-tca-quadrant-airbus-edition).',
        '',
    ]),
    image: { url: TCA_URL },
});

export const tca: MessageCommandDefinition = {
    name: ['tca'],
    description: 'Provides more information on keybinding issues with the tca throttle without add-ons',
    category: CommandCategory.SUPPORT,
    genericEmbed: tcaEmbed,
};
