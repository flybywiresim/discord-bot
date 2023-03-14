import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory, RoleGroups } from '../../constants';

const ROLES_EMBED = makeEmbed({
    title: 'Role Assignment',
    description: makeLines([
        'Please react below to set your role according to your skill set. If you do not have the skills in any of the available roles, please do not react as this will not benefit the development of the addon.',
        '',
        ':computer: Interested in Programming',
        ':triangular_ruler: Interested in Modelling/Design',
    ]),
});

const MEDIA_ANNOUNCEMENT_EMBED = makeEmbed({
    title: 'Media Announcements',
    description: makeLines([
        'Please react to the corresponding reactions to be pinged for the various announcements.',
        '',
        ':mega: Server Announcements',
        ':airplane: A32NX Releases',
        ':hourglass_flowing_sand: Progress Updates',
        ':newspaper: Media Announcements (FBW YouTube)',
    ]),
});

export const roleassignment: CommandDefinition = {
    name: 'roleassignment',
    description: 'Sends the role assignment messages',
    requirements: { roles: RoleGroups.STAFF },
    category: CommandCategory.MODERATION,
    executor: async (msg) => {
        await msg.channel.send({ embeds: [ROLES_EMBED] });
        await msg.channel.send({ embeds: [MEDIA_ANNOUNCEMENT_EMBED] });
    },
};
