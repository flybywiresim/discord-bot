import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

const MCDU_BASE_URL = 'https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu';

const mcduEmbed = makeEmbed({
    title: 'FlyByWire A32NX | MCDU Documentation',
    description: makeLines([
        `Please see our [MCDU documentation](${MCDU_BASE_URL}) for information on the MCDU of the FlyByWire A32NX.`,
        '',
        'If you\'d like to immediately go to a specific chapter please use the list below:',
        `- [Overview](${MCDU_BASE_URL})`,
        `- [MCDU Interface](${MCDU_BASE_URL}/interface/)`,
        `- [DIR TO page](${MCDU_BASE_URL}/dir/)`,
        `- [PROG page](${MCDU_BASE_URL}/prog/)`,
        `- [PERF page](${MCDU_BASE_URL}/perf/)`,
        `- [INIT page](${MCDU_BASE_URL}/init/)`,
        `- [DATA page](${MCDU_BASE_URL}/data/)`,
        `- [F-PLN page](${MCDU_BASE_URL}/f-pln/)`,
        `- [RAD NAV page](${MCDU_BASE_URL}/rad-nav/)`,
        `- [FUEL PRED page](${MCDU_BASE_URL}/fuel-pred/)`,
        `- [SEC F-PLN page](${MCDU_BASE_URL}/sec-f-plan/)`,
        `- [ATC COMM page](${MCDU_BASE_URL}/atc-comm/)`,
        `- [MCDU MENU page](${MCDU_BASE_URL}/mcdu-menu/)`,
        `- [MCDU Messages](${MCDU_BASE_URL}/messages/)`,
    ]),
});

export const mcdu: MessageCommandDefinition = {
    name: ['mcdu', 'mcdudoc'],
    description: 'Provides a link to the MCDU documentation',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: mcduEmbed,
};
