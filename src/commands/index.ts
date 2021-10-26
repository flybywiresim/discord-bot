import { CommandDefinition } from '../lib/command';
import Logger from '../lib/logger';
import { ping } from './utils/ping';
import { help } from './utils/help';
import { bruheg } from './funnies/bruheg';
import { boratorium } from './funnies/boratorium';
import { efb } from './a32nx/efb';
import { deadzones } from './support/deadzones';
import { screens } from './a32nx/screens';
import { when } from './general/when';
import { ban } from './moderation/ban';
import { unban } from './moderation/unban';
import { trythis } from './support/trythis';
import { experimental } from './a32nx/experimental';
import { versions } from './a32nx/versions';
import { membercount } from './utils/membercount';
import { installer } from './general/installer';
import { roleinfo } from './utils/roleinfo';
import { adirs } from './a32nx/adirs';
import { installererror } from './support/installererror';
import { reportedissues } from './support/reportedissues';
import { autopilot } from './a32nx/autopilot';
import { checklist } from './a32nx/checklist';
import { whois } from './moderation/whois';
import { donate } from './general/donate';
import { utf8 } from './support/utf-8';
import { calibrate } from './support/calibrate';
import { controls } from './support/controls';
import { nut } from './funnies/nut';
import { screenshot } from './support/screenshot';
import { msfs } from './support/msfs';
import { content } from './support/content';
import { beginner } from './a32nx/beginner-guide';
import { briefing } from './a32nx/briefing';
import { boris } from './funnies/boris';
import { afloor } from './a32nx/afloor';
import { airframe } from './a32nx/airframe';
import { xbox } from './a32nx/xbox';
import { willithave } from './general/willithave';
import { faq } from './moderation/faq';
import { community } from './support/community';
import { roadmap } from './general/roadmap';
import { clean } from './support/clean-install';
import { liveries } from './a32nx/liveries';
import { simversion } from './support/simversion';
import { printer } from './a32nx/printer';
import { where } from './support/where';
import { ctrl_e } from './a32nx/ctrl_e';
import { weather } from './a32nx/weather';
import { qa } from './general/qa';
import { ptu } from './funnies/ptu';

const commands: CommandDefinition[] = [
    ping,
    help,
    bruheg,
    boratorium,
    efb,
    deadzones,
    screens,
    when,
    ban,
    unban,
    trythis,
    experimental,
    versions,
    membercount,
    installer,
    roleinfo,
    adirs,
    installererror,
    reportedissues,
    autopilot,
    checklist,
    whois,
    donate,
    utf8,
    calibrate,
    controls,
    nut,
    screenshot,
    msfs,
    content,
    beginner,
    briefing,
    boris,
    afloor,
    airframe,
    xbox,
    willithave,
    faq,
    community,
    roadmap,
    clean,
    liveries,
    simversion,
    printer,
    where,
    ctrl_e,
    weather,
    qa,
    ptu,
];

const commandsObject: { [k: string]: CommandDefinition } = {};

for (const def of commands) {
    for (const name of (typeof def.name === 'string' ? [def.name] : def.name)) {
        if (commandsObject[name]) {
            Logger.warn(`Duplicate command/alias inserted: ${name}`);
        }
        commandsObject[name] = def;
    }
}

export default commandsObject;
