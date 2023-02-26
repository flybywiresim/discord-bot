import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const BASE_URL = 'https://docs.flybywiresim.com/fbw-a32nx/feature-guides/gsxintegration';

const gsxIntegrationEmbed = makeEmbed({
    title: 'FlyByWire A32NX | GSX Integration Documentation',
    description: makeLines([
        `Please see our [GSX Integration documentation](${BASE_URL}) for information on the GSX Integration of the FlyByWire A32NX.`,
        '',
        'If you\'d like to immediately go to a specific chapter please use the list below:',
        `- [Overview](${BASE_URL})`,
        `- [Payload](${BASE_URL}/payload)`,
        `- [Fuel](${BASE_URL}/fuel)`,
        `- [Profile](${BASE_URL}/profile)`,
    ]),
});

export const gsxIntegration: MessageCommandDefinition = {
    name: ['gsx-integration', 'gsx'],
    description: 'Provides a link to the Vertical Guidance documentation',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: gsxIntegrationEmbed,
};
