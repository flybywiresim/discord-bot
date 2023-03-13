import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, imageBaseUrl } from '../../constants';

const SIMVERSION_HELP_URL = `${imageBaseUrl}/support/simversion.jpg`;

const simversionEmbed = makeEmbed({
    title: 'FlyByWire Support | Checking your MSFS version',
    description: makeLines([
        'In order to rule out version conflicts and continue with providing support for our aircraft, we need to see a screenshot showing your MSFS version. The version of Microsoft Flight Simulator 2020 you\'re using can be found in several ways:',
        '',
        'In the MSFS main menu you can click on your username in the upper right corner. This will display your version. Further ways to identify and show your sim version can be found [here.](https://docs.flybywiresim.com/fbw-a32nx/support/#msfs-version)',
    ]),
    image: { url: SIMVERSION_HELP_URL },
});

export const simversion: MessageCommandDefinition = {
    name: ['simversion', 'msfsversion'],
    description: 'Help to identify MSFS version for support',
    category: CommandCategory.SUPPORT,
    genericEmbed: simversionEmbed,
};
