import { MessageCommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const waypointEmbed = makeEmbed({
    title: 'FlyByWire A32NX | Stored Waypoints',
    description: 'Please see our [guide](https://docs.flybywiresim.com/pilots-corner/advanced-guides/data-management/) on stored waypoints.',
});

export const storedWaypoint: MessageCommandDefinition = {
    name: ['waypoint', 'storedwaypoint', 'datamanagement'],
    description: 'Provides a link to the a32nx data management guide',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: waypointEmbed,
};
