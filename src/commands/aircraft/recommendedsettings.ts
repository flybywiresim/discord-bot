import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const recommendedSettingsEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Recommended Settings',
    description: makeLines([
        'Before embarking on your flight please ensure you have looked at our recommended settings guide.',
        '',
        'This page aims to list a few recommended settings for Microsoft Flight Simulator, Windows and the A32NX.',
        '',
        'Please read our guide [here.](https://docs.flybywiresim.com/fbw-a32nx/settings/)',
    ]),
});

export const recommendedSettings: MessageCommandDefinition = {
    name: 'rs',
    category: CommandCategory.AIRCRAFT,
    description: 'Provides a link to the recommended settings docs guide.',
    genericEmbed: recommendedSettingsEmbed,
};
