import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const customWaypoint: CommandDefinition = {
    name: ['waypoint', 'customwaypoint'],
    description: 'Provides a link to the a32nx custom waypoint guide',
    category: CommandCategory.A32NX,
    executor: async (msg) => {
        const waypointEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Custom Waypoints',
            description: 'Please see our [guide](https://docs.flybywiresim.com/pilots-corner/advanced-guides/data-management/#new-waypoint-page) on how to set up custom waypoints.',
        });

        await msg.channel.send({ embeds: [waypointEmbed] });

    },
};
