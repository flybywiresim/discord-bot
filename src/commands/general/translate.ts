import { MessageCommandDefinition } from '../../lib/command';
import { Channels, CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const translateEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Project Translations',
    description: makeLines([
        'If you have any questions or are looking to contribute to the flyPadOS 3 or Installer translation efforts please see the following information.',
        '',
        `Discussion Channel: <#${Channels.LOCALISATION}>`,
        '',
        'You can find the appropriate website for contributions below: ',
        '- [flyPadOS 3 Translations](https://localazy.com/p/flypados) ',
        '- [Installer Translations](https://localazy.com/p/flybywire-installer) ',
    ]),
});

export const translate: MessageCommandDefinition = {
    name: ['translate'],
    description: 'Provides information on how to contribute to various FlyByWire translation efforts.',
    category: CommandCategory.GENERAL,
    genericEmbed: translateEmbed,
};
