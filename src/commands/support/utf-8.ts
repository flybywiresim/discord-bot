import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const utf8: CommandDefinition = {
    name: 'utf8',
    description: 'Provides a link to resolve UTF-8 issues',
    category: CommandCategory.SUPPORT,
    executor: async (msg) => {
        const utf8Embed = makeEmbed({
            title: 'FlyByWire A32NX | UTF-8',
            description: makeLines([
                'In rare cases the Autopilot, FADEC and electrical systems may not start or behave erratically. This is in part due to UTF-8 language support beta not enabled on your machine.',
                '',
                'Please see our [documentation](https://docs.flybywiresim.com/fbw-a32nx/support/reported-issues/?h=utf8#autopilot-fadec-electrical-systems-not-working-as-intended-utf8-issue) for solutions.',
            ]),
        });

        await msg.channel.send({ embeds: [utf8Embed] });
    },
};
