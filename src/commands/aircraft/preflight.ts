import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const preflightEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Preflight',
    description: 'Please see our [guide](https://docs.flybywiresim.com/pilots-corner/beginner-guide/preflight/) for a quick reference guide on things you should do before departing in the A32NX.',
});

export const preflight: MessageCommandDefinition = {
    name: 'preflight',
    description: 'Provides a link to the a32nx preflight guide',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: preflightEmbed,
};
