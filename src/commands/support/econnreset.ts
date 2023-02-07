import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const econnresetEmbed = makeEmbed({
    title: 'FlyByWire Support | ECONNRESET',
    description: makeLines([
        'To verify that this issue is not caused by your ISP, please use a VPN set to the US and try again.',
        '',
        'We recommend [ProtonVPN](https://protonvpn.com/free-vpn/)* as they offer a free plan.',
    ]),
    footer: { text: '*ProtonVPN is not associated with FlyByWire Simulations. We only suggest this solution as it has been proven to work in the past.' },
});

export const econnreset: MessageCommandDefinition = {
    name: ['econnreset', 'econreset'],
    category: CommandCategory.SUPPORT,
    genericEmbed: econnresetEmbed,
};
