import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const translate: CommandDefinition = {
    name: ['translate'],
    description: 'Provides information on how to contribute to various FlyByWire translation efforts.',
    category: CommandCategory.GENERAL,
    executor: async (msg) => {
        const translateEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Project Translations',
            description: makeLines([
                'If you have any questions or are looking to contribute to the flyPadOS3 or Installer translations '
                + ' effort please see the following information. ',
                '',
                'Discussion Channel: <#964912922272870470> ',
                '',
                'You can find the appropriate website for contributions below: ',
                '- [flyPadOS 3 Translations](https://localazy.com/p/flypados) ',
                '- [Installer Translations](https://localazy.com/p/flybywire-installer) ',
            ]),
        });

        await msg.channel.send({ embeds: [translateEmbed] });

    },
};
